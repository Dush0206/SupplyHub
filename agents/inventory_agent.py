from database import SessionLocal, Inventory

def calculate_reorder_point(query: str) -> str:
    """
    Simulates a specialized agent that calculates reorder points and safety stock.
    """
    db = SessionLocal()
    try:
        # Example: Fetching the first item in the DB for demonstration.
        # A real agent would extract the item_name from the `query`.
        item = db.query(Inventory).filter(Inventory.item_name == "Widget A").first()
        if not item:
            return "Item not found in inventory."
            
        rop = (item.avg_daily_usage * 7) + item.safety_stock  # Assuming 7 day lead time
        
        status = "CRITICAL: Restock immediately." if item.quantity < rop else "Stock is healthy."
        
        return f"For {item.item_name}: Current Quantity is {item.quantity}. Calculated Reorder Point is {rop:.0f}. Status: {status}"
    finally:
        db.close()
