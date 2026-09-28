from fastapi import FastAPI, Depends, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import math
import random
import datetime
from database import SessionLocal, get_db, Product, Inventory, Supplier, PurchaseOrder, SalesHistory, LogisticsRoute, Alert, Recommendation
from agents.orchestrator import run_orchestrator

app = FastAPI(
    title="AI Supply Chain Intelligence & Inventory Optimization API",
    description="Backend service powering ML demand predictions, inventory intelligence, supplier risk, and agent orchestrator",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Pydantic Schemas
# ----------------------------
class OrchestratorRequest(BaseModel):
    query: str

class OrchestratorResponse(BaseModel):
    response: str
    agents_used: List[str]

class ForecastRequest(BaseModel):
    product: str = "Laptop"
    location: str = "Chennai"
    horizon_days: int = 30
    model_name: str = "XGBoost"

class ReorderRequest(BaseModel):
    product: str

class LogisticsRequest(BaseModel):
    origin: str
    destination: str
    vehicle_capacity: str = "10 Ton Truck"
    delivery_deadline: float = 24.0

class WhatIfRequest(BaseModel):
    demand_change_pct: float = 0.0 # e.g. 20.0 for +20%
    price_change_pct: float = 0.0
    lead_time_change_days: int = 0
    safety_stock_mult: float = 1.0

# ----------------------------
# API Endpoints
# ----------------------------

@app.get("/")
def read_root():
    return {"status": "online", "system": "AI Supply Chain Intelligence OS", "version": "2.0.0"}

# 1. Main Dashboard KPIs
@app.get("/api/dashboard/kpi")
def get_dashboard_kpis(db = Depends(get_db)):
    products = db.query(Inventory).all()
    total_qty = sum(p.quantity for p in products)
    total_pred_demand = sum(p.predicted_demand for p in products)
    critical_count = sum(1 for p in products if p.status == "Critical" or p.stockout_risk_pct > 50.0)
    
    suppliers = db.query(Supplier).all()
    avg_supplier_risk = round(sum((1.0 - s.reliability_score)*100 for s in suppliers) / max(1, len(suppliers)), 1)
    
    pending_pos = db.query(PurchaseOrder).filter(PurchaseOrder.status.in_(["Pending Approval", "Critical"])).count()
    
    return {
        "predicted_demand_30d": total_pred_demand if total_pred_demand > 0 else 32400,
        "current_inventory": total_qty if total_qty > 0 else 35850,
        "stockout_risk_pct": round((critical_count / max(1, len(products))) * 100, 1),
        "supplier_risk_index": avg_supplier_risk,
        "inventory_turnover": 6.8,
        "pending_reorders": pending_pos
    }

# 2. Demand Forecast Endpoint
@app.get("/api/demand/forecast")
def get_demand_forecast(
    product: str = Query("Laptop"),
    location: str = Query("Chennai"),
    horizon: int = Query(30),
    model: str = Query("XGBoost"),
    db = Depends(get_db)
):
    prod = db.query(Inventory).filter(Inventory.item_name == product).first()
    base_qty = prod.predicted_demand if prod else 4000
    
    # Model metrics simulation based on selected model
    metrics_map = {
        "XGBoost": {"mae": 142.5, "rmse": 185.2, "mape": 3.8, "r2": 0.96},
        "LightGBM": {"mae": 148.0, "rmse": 192.1, "mape": 4.1, "r2": 0.95},
        "SARIMA": {"mae": 180.2, "rmse": 235.4, "mape": 5.4, "r2": 0.91},
        "Prophet": {"mae": 195.0, "rmse": 250.8, "mape": 5.9, "r2": 0.89},
        "LSTM": {"mae": 155.1, "rmse": 199.6, "mape": 4.2, "r2": 0.94}
    }
    
    model_metrics = metrics_map.get(model, metrics_map["XGBoost"])
    
    # Generate daily actual (past 30 days) and predicted (future `horizon` days)
    today = datetime.date.today()
    chart_data = []
    
    # Past 30 days actuals
    daily_base = base_qty / 30.0
    for i in range(30, 0, -1):
        d = today - datetime.timedelta(days=i)
        actual = max(10, int(daily_base * (0.85 + math.sin(i*0.3)*0.15 + (i%5)*0.02)))
        chart_data.append({
            "date": d.strftime("%b %d"),
            "actual": actual,
            "predicted": None,
            "lower_bound": None,
            "upper_bound": None
        })
        
    # Future forecast
    for i in range(0, horizon):
        d = today + datetime.timedelta(days=i)
        pred = max(10, int(daily_base * (0.90 + math.cos(i*0.25)*0.18 + (i%4)*0.03)))
        margin = int(pred * 0.12)
        chart_data.append({
            "date": d.strftime("%b %d"),
            "actual": None,
            "predicted": pred,
            "lower_bound": pred - margin,
            "upper_bound": pred + margin
        })
        
    expected_demand = base_qty
    confidence_min = int(expected_demand * 0.88)
    confidence_max = int(expected_demand * 1.15)
    
    return {
        "product": product,
        "location": location,
        "horizon_days": horizon,
        "model_selected": model,
        "metrics": model_metrics,
        "summary": {
            "expected_demand": expected_demand,
            "avg_daily_demand": round(expected_demand / horizon, 1),
            "confidence_range": f"{confidence_min:,} – {confidence_max:,} units"
        },
        "chart_data": chart_data
    }

# 3. Demand History
@app.get("/api/demand/history")
def get_demand_history(product: Optional[str] = None, db = Depends(get_db)):
    query = db.query(SalesHistory)
    if product:
        query = query.filter(SalesHistory.product_name == product)
    records = query.order_by(SalesHistory.date.desc()).limit(150).all()
    return records

# 4. Inventory Status
@app.get("/api/inventory/status")
def get_inventory_status(db = Depends(get_db)):
    items = db.query(Inventory).all()
    return items

# 5. Reorder Recommendation
@app.post("/api/inventory/reorder")
def generate_reorder_recommendation(req: ReorderRequest, db = Depends(get_db)):
    item = db.query(Inventory).filter(Inventory.item_name == req.product).first()
    if not item:
        raise HTTPException(status_code=404, detail="Product not found")
        
    recommended_order = max(0, (item.predicted_demand + item.safety_stock) - item.quantity)
    order_date = "Immediate (Within 24h)" if item.quantity < item.reorder_point else "Within 7 days"
    
    return {
        "product": item.item_name,
        "current_inventory": item.quantity,
        "predicted_demand": item.predicted_demand,
        "safety_stock": item.safety_stock,
        "reorder_point": item.reorder_point,
        "recommended_order": recommended_order,
        "recommended_order_date": order_date,
        "explanation": f"Current inventory of {item.quantity:,} units is below reorder point of {item.reorder_point:,} units. Reordering {recommended_order:,} units will cover predicted demand of {item.predicted_demand:,} units plus a safety buffer of {item.safety_stock:,} units."
    }

# 6. Supplier Risk Assessment
@app.get("/api/suppliers/risk")
def get_supplier_risk(db = Depends(get_db)):
    suppliers = db.query(Supplier).all()
    return suppliers

# 7. Logistics Route Optimization
@app.post("/api/logistics/optimize")
def optimize_logistics(req: LogisticsRequest):
    # Simulated optimization engine
    distance = round(random.uniform(50.0, 450.0), 1)
    est_time = round(distance / 50.0, 1)
    cost = round(distance * 28.5 + 400, 0)
    
    return {
        "origin": req.origin,
        "destination": req.destination,
        "vehicle_capacity": req.vehicle_capacity,
        "recommended_route": f"{req.origin} → Express Corridor Exit 12 → {req.destination}",
        "distance_km": distance,
        "estimated_time_hrs": est_time,
        "transportation_cost_inr": cost
    }

# 8. What-If Scenario Simulation
@app.post("/api/whatif/simulation")
def run_whatif_simulation(req: WhatIfRequest, db = Depends(get_db)):
    baseline_risk = 18.0
    demand_mult = 1.0 + (req.demand_change_pct / 100.0)
    lead_time_penalty = req.lead_time_change_days * 2.5
    safety_buffer = req.safety_stock_mult
    
    simulated_risk = min(99.0, max(1.0, baseline_risk * demand_mult * (1.0 + (req.price_change_pct*0.01)) + lead_time_penalty - (safety_buffer - 1.0)*15.0))
    additional_inventory = int(max(0, 12000 * (demand_mult - 1.0) / safety_buffer))
    
    return {
        "demand_change_pct": req.demand_change_pct,
        "baseline_stockout_risk_pct": baseline_risk,
        "simulated_stockout_risk_pct": round(simulated_risk, 1),
        "additional_inventory_required": additional_inventory,
        "impact_summary": f"With a {req.demand_change_pct:+.1f}% demand shift and +{req.lead_time_change_days} lead time days, stockout risk changes to {simulated_risk:.1f}%. Additional buffer of {additional_inventory:,} units is advised."
    }

# 9. AI Orchestrator Agent
@app.post("/api/orchestrate", response_model=OrchestratorResponse)
def orchestrate(request: OrchestratorRequest):
    agent_response = run_orchestrator(request.query)
    return OrchestratorResponse(
        response=agent_response,
        agents_used=["Demand Agent", "Inventory Agent", "Supplier Agent", "Logistics Agent"]
    )

# 10. Alert Center
@app.get("/api/alerts")
def get_alerts(db = Depends(get_db)):
    alerts = db.query(Alert).all()
    return alerts

# 11. Reports & Recommendations
@app.get("/api/recommendations")
def get_recommendations(db = Depends(get_db)):
    recs = db.query(Recommendation).all()
    return recs

@app.get("/api/reports")
def get_reports():
    return [
        {"id": "REP-01", "name": "Demand Forecast Monthly Summary", "category": "Demand", "date": "2026-09-28", "format": "PDF / CSV"},
        {"id": "REP-02", "name": "Inventory Health & EOQ Audit", "category": "Inventory", "date": "2026-09-27", "format": "PDF / CSV"},
        {"id": "REP-03", "name": "Supplier Reliability & Lead Time Risk", "category": "Suppliers", "date": "2026-09-25", "format": "PDF / CSV"},
        {"id": "REP-04", "name": "Logistics Cost & Route Efficiency", "category": "Logistics", "date": "2026-09-24", "format": "PDF / CSV"},
        {"id": "REP-05", "name": "AI Prescriptive Order Recommendations", "category": "AI Agents", "date": "2026-09-28", "format": "PDF / CSV"}
    ]
