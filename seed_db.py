from database import engine, Base, SessionLocal, Product, Inventory, Supplier, PurchaseOrder, SalesHistory, LogisticsRoute, Alert, Recommendation
import datetime
import random

def seed():
    # Re-create all tables
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    print("Seeding database with realistic supply chain demo data...")
    
    products_data = [
        {"sku": "SKU-LAP-001", "name": "Laptop", "cat": "Computers", "price": 1200.0, "qty": 2500, "safety": 800, "rop": 3200, "pred": 4000, "risk": 42.5, "status": "Low Stock", "loc": "Chennai"},
        {"sku": "SKU-PHN-002", "name": "Smartphone", "cat": "Mobile", "price": 800.0, "qty": 8500, "safety": 1500, "rop": 4500, "pred": 5200, "risk": 8.0, "status": "Healthy", "loc": "Bengaluru"},
        {"sku": "SKU-HDP-003", "name": "Headphones", "cat": "Audio", "price": 150.0, "qty": 1400, "safety": 2000, "rop": 3500, "pred": 4200, "risk": 78.0, "status": "Critical", "loc": "Mumbai"},
        {"sku": "SKU-MON-004", "name": "Monitor", "cat": "Displays", "price": 350.0, "qty": 4200, "safety": 1000, "rop": 2200, "pred": 2800, "risk": 12.0, "status": "Healthy", "loc": "Delhi"},
        {"sku": "SKU-KBD-005", "name": "Keyboard", "cat": "Peripherals", "price": 75.0, "qty": 6100, "safety": 1200, "rop": 2500, "pred": 3100, "risk": 5.0, "status": "Healthy", "loc": "Hyderabad"},
        {"sku": "SKU-WCH-006", "name": "Smartwatch", "cat": "Wearables", "price": 250.0, "qty": 1800, "safety": 1500, "rop": 3000, "pred": 3800, "risk": 65.0, "status": "Low Stock", "loc": "Chennai"},
        {"sku": "SKU-TAB-007", "name": "Tablet", "cat": "Mobile", "price": 500.0, "qty": 3400, "safety": 1000, "rop": 2000, "pred": 2400, "risk": 15.0, "status": "Healthy", "loc": "Bengaluru"},
        {"sku": "SKU-RTR-008", "name": "Wireless Router", "cat": "Networking", "price": 120.0, "qty": 950, "safety": 1200, "rop": 2100, "pred": 2900, "risk": 85.0, "status": "Critical", "loc": "Mumbai"},
        {"sku": "SKU-SRV-009", "name": "Server Blade", "cat": "Enterprise", "price": 3500.0, "qty": 450, "safety": 300, "rop": 500, "pred": 620, "risk": 28.0, "status": "Healthy", "loc": "Delhi"},
        {"sku": "SKU-SSD-010", "name": "External SSD", "cat": "Storage", "price": 180.0, "qty": 5200, "safety": 1500, "rop": 3000, "pred": 3600, "risk": 10.0, "status": "Healthy", "loc": "Hyderabad"}
    ]

    for p in products_data:
        prod = Product(
            sku=p["sku"],
            item_name=p["name"],
            category=p["cat"],
            unit_price=p["price"],
            quantity=p["qty"],
            safety_stock=p["safety"],
            reorder_point=p["rop"],
            avg_daily_usage=round(p["pred"] / 30.0, 1),
            eoq=int(p["pred"] * 0.6),
            spoilage_risk="High" if p["status"] == "Critical" else ("Medium" if p["status"] == "Low Stock" else "Low"),
            status=p["status"],
            location=p["loc"]
        )
        db.add(prod)

        inv = Inventory(
            item_name=p["name"],
            quantity=p["qty"],
            safety_stock=p["safety"],
            avg_daily_usage=round(p["pred"] / 30.0, 1),
            eoq=int(p["pred"] * 0.6),
            reorder_point=p["rop"],
            predicted_demand=p["pred"],
            stockout_risk_pct=p["risk"],
            expiry_date="2027-12-31",
            spoilage_risk="High" if p["status"] == "Critical" else ("Medium" if p["status"] == "Low Stock" else "Low"),
            status=p["status"],
            location=p["loc"]
        )
        db.add(inv)

    # Seed Suppliers
    suppliers_data = [
        Supplier(name="Global Supply Co", reliability_score=0.98, lead_time_days=5, price_index=1.00, quality_score=0.97, capacity_risk="Low", status="Active", risk_level="Low Risk", location="Los Angeles, USA", lat=34.0522, lng=-118.2437),
        Supplier(name="Cheap Parts Inc", reliability_score=0.82, lead_time_days=14, price_index=0.82, quality_score=0.84, capacity_risk="High", status="Delayed", risk_level="High Risk", location="Shenzhen, CN", lat=22.5431, lng=114.0579),
        Supplier(name="Premium Logistics", reliability_score=0.99, lead_time_days=3, price_index=1.20, quality_score=0.99, capacity_risk="Low", status="Active", risk_level="Low Risk", location="Singapore", lat=1.3521, lng=103.8198),
        Supplier(name="TechComponents Ltd", reliability_score=0.91, lead_time_days=7, price_index=0.95, quality_score=0.92, capacity_risk="Medium", status="Active", risk_level="Medium Risk", location="Taipei, TW", lat=25.0330, lng=121.5654),
        Supplier(name="Apex Hardware", reliability_score=0.88, lead_time_days=9, price_index=0.90, quality_score=0.89, capacity_risk="Medium", status="Active", risk_level="Medium Risk", location="Frankfurt, DE", lat=50.1109, lng=8.6821)
    ]
    db.add_all(suppliers_data)

    # Seed Purchase Orders
    pos_data = [
        PurchaseOrder(id="PO-2026-891", supplier="Premium Logistics", item="Laptop", quantity=2300, total_cost=2760000.0, ai_confidence=98, status="Pending Approval", urgency="Critical"),
        PurchaseOrder(id="PO-2026-892", supplier="Global Supply Co", item="Smartphone", quantity=3500, total_cost=2800000.0, ai_confidence=95, status="Auto-Approved", urgency="Normal"),
        PurchaseOrder(id="PO-2026-893", supplier="Cheap Parts Inc", item="Headphones", quantity=3000, total_cost=450000.0, ai_confidence=74, status="Rejected", urgency="Low"),
        PurchaseOrder(id="PO-2026-894", supplier="TechComponents Ltd", item="Wireless Router", quantity=2000, total_cost=240000.0, ai_confidence=91, status="In Transit", urgency="Critical"),
        PurchaseOrder(id="PO-2026-895", supplier="Apex Hardware", item="Smartwatch", quantity=1500, total_cost=375000.0, ai_confidence=89, status="Pending Approval", urgency="Normal")
    ]
    db.add_all(pos_data)

    # Seed 90 Days Sales History for all 10 products
    today = datetime.date.today()
    sales_list = []
    locations = ["Chennai", "Bengaluru", "Mumbai", "Delhi", "Hyderabad"]
    
    for p in products_data:
        base_demand = p["pred"] / 30.0
        for day_offset in range(90, 0, -1):
            sale_date = today - datetime.timedelta(days=day_offset)
            is_weekend = sale_date.weekday() >= 5
            is_promo = random.random() < 0.15
            is_holiday = random.random() < 0.05
            
            mult = 1.0
            if is_weekend: mult *= 1.25
            if is_promo: mult *= 1.45
            if is_holiday: mult *= 0.70
            
            qty = max(10, int(base_demand * mult * (0.85 + random.random() * 0.3)))
            
            sales_list.append(SalesHistory(
                product_name=p["name"],
                location=random.choice(locations),
                date=sale_date.isoformat(),
                quantity_sold=qty,
                unit_price=p["price"],
                promotion_active=is_promo,
                is_holiday=is_holiday
            ))
    db.add_all(sales_list)

    # Seed Logistics Routes
    routes_data = [
        LogisticsRoute(origin="Warehouse Alpha (Chennai)", destination="Chennai Hub", vehicle_capacity="10 Ton Truck", delivery_deadline_hrs=6.0, recommended_route="Warehouse → Chennai Outer Ring Road → Chennai Hub", distance_km=45.0, estimated_time_hrs=1.2, cost_inr=1250.0),
        LogisticsRoute(origin="Chennai Hub", destination="Bengaluru Central Zone", vehicle_capacity="15 Ton Container", delivery_deadline_hrs=12.0, recommended_route="Chennai Hub → NH44 Expressway → Bengaluru Central", distance_km=345.0, estimated_time_hrs=6.5, cost_inr=8500.0),
        LogisticsRoute(origin="Mumbai Warehouse", destination="Pune Distribution Point", vehicle_capacity="5 Ton Van", delivery_deadline_hrs=8.0, recommended_route="Mumbai Port → Expressway Exit 4 → Pune Hub", distance_km=148.0, estimated_time_hrs=3.2, cost_inr=3200.0),
        LogisticsRoute(origin="Delhi Central Depot", destination="Noida Hub", vehicle_capacity="8 Ton Truck", delivery_deadline_hrs=5.0, recommended_route="Delhi Depot → DND Flyway → Noida Sec 62", distance_km=32.0, estimated_time_hrs=1.1, cost_inr=1100.0)
    ]
    db.add_all(routes_data)

    # Seed Alerts
    alerts_data = [
        Alert(severity="Critical", category="Stockout Risk", product="Laptop", location="Chennai", message="High Stockout Risk: Laptop demand (4,000 units) will exceed available stock (2,500 units) within 7 days.", expected_date=(today + datetime.timedelta(days=7)).isoformat(), recommended_action="Issue immediate PO for 2,300 units from Premium Logistics."),
        Alert(severity="Critical", category="Stockout Risk", product="Headphones", location="Mumbai", message="Critical Stockout Risk: Headphones inventory is 1,400 units against predicted demand of 4,200 units.", expected_date=(today + datetime.timedelta(days=3)).isoformat(), recommended_action="Expedite shipment of 3,000 units with air freight."),
        Alert(severity="Warning", category="Supplier Delay", product="Wireless Router", location="Shenzhen", message="Cheap Parts Inc lead time increased from 9 to 14 days due to port congestion.", expected_date=(today + datetime.timedelta(days=5)).isoformat(), recommended_action="Reroute order to TechComponents Ltd."),
        Alert(severity="Warning", category="Low Inventory", product="Smartwatch", location="Chennai", message="Smartwatch stock (1,800 units) dropped below Reorder Point (3,000 units).", expected_date=(today + datetime.timedelta(days=10)).isoformat(), recommended_action="Approve automated reorder recommendation."),
        Alert(severity="Info", category="Demand Surge", product="Smartphone", location="Bengaluru", message="Demand surge of +24% predicted for Smartphone during upcoming festival season.", expected_date=(today + datetime.timedelta(days=15)).isoformat(), recommended_action="Adjust safety stock baseline by +15%.")
    ]
    db.add_all(alerts_data)

    # Seed Recommendations
    recs_data = [
        Recommendation(
            product="Laptop",
            current_inventory=2500,
            predicted_demand=4000,
            safety_stock=800,
            reorder_point=3200,
            recommended_order=2300,
            recommended_order_date="Within 3 days",
            explanation="Predicted 30-day demand is 4,000 units. Adding 800 safety stock minus 2,500 current units requires a replenishment order of 2,300 units to maintain zero stockout risk."
        ),
        Recommendation(
            product="Headphones",
            current_inventory=1400,
            predicted_demand=4200,
            safety_stock=2000,
            reorder_point=3500,
            recommended_order=4800,
            recommended_order_date="Immediate (Today)",
            explanation="Current stock is 1,400 units with 78% stockout risk. Expedited reorder of 4,800 units is strongly advised."
        ),
        Recommendation(
            product="Wireless Router",
            current_inventory=950,
            predicted_demand=2900,
            safety_stock=1200,
            reorder_point=2100,
            recommended_order=3150,
            recommended_order_date="Within 2 days",
            explanation="Router inventory is at critical level (950 units). Supplier lead time is 7 days, so reorder must be issued immediately."
        )
    ]
    db.add_all(recs_data)

    db.commit()
    print("Database successfully seeded with comprehensive supply chain dataset!")
    db.close()

if __name__ == "__main__":
    seed()
