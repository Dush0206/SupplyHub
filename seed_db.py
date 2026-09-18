from database import engine, Base, SessionLocal, Inventory, Supplier, PurchaseOrder
import os

def seed():
    # Drop and recreate tables to ensure fresh schema
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    print("Seeding database...")
    
    # Seed Inventory
    items = [
        Inventory(item_name="Widget A", quantity=38120, safety_stock=40000, avg_daily_usage=1200.5, eoq=5000, expiry_date="N/A", spoilage_risk="Low", status="Healthy"),
        Inventory(item_name="Widget B", quantity=15000, safety_stock=10000, avg_daily_usage=450.2, eoq=2500, expiry_date="2026-11-01", spoilage_risk="Medium", status="Active"),
        Inventory(item_name="Widget C", quantity=500, safety_stock=2000, avg_daily_usage=100.0, eoq=800, expiry_date="2026-09-15", spoilage_risk="High", status="Critical")
    ]
    db.add_all(items)
    
    # Seed Suppliers
    suppliers = [
        Supplier(name="Global Supply Co", reliability_score=0.98, lead_time_days=5, price_index=1.0, status="Active", location="Los Angeles, CA", lat=34.0522, lng=-118.2437),
        Supplier(name="Cheap Parts Inc", reliability_score=0.85, lead_time_days=12, price_index=0.85, status="Delayed", location="New York, NY", lat=40.7128, lng=-74.0060),
        Supplier(name="Premium Logistics", reliability_score=0.99, lead_time_days=3, price_index=1.2, status="Active", location="Houston, TX", lat=29.7604, lng=-95.3698)
    ]
    db.add_all(suppliers)

    # Seed Purchase Orders
    pos = [
        PurchaseOrder(id="PO-2026-891", supplier="Premium Logistics", item="Widget C", quantity=2500, total_cost=45000.00, ai_confidence=98, status="Pending Approval", urgency="Critical"),
        PurchaseOrder(id="PO-2026-892", supplier="Global Supply Co", item="Widget A", quantity=10000, total_cost=125000.00, ai_confidence=94, status="Auto-Approved", urgency="Normal"),
        PurchaseOrder(id="PO-2026-893", supplier="Cheap Parts Inc", item="Widget B", quantity=5000, total_cost=42500.00, ai_confidence=72, status="Rejected", urgency="Low")
    ]
    db.add_all(pos)
    
    db.commit()
    print("Database seeded successfully.")
    db.close()

if __name__ == "__main__":
    seed()
