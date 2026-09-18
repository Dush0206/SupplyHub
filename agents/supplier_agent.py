from database import SessionLocal, Supplier

def evaluate_suppliers(query: str) -> str:
    """
    Simulates a specialized agent that evaluates suppliers based on reliability, lead time, and price.
    """
    db = SessionLocal()
    try:
        suppliers = db.query(Supplier).all()
        if not suppliers:
            return "No suppliers found in the database."
            
        best_supplier = max(suppliers, key=lambda s: s.reliability_score)
        
        response = f"Evaluated {len(suppliers)} suppliers. "
        response += f"The most reliable supplier is {best_supplier.name} with a reliability score of {best_supplier.reliability_score:.2f} "
        response += f"and a lead time of {best_supplier.lead_time_days} days. "
        response += f"Their price index is {best_supplier.price_index:.2f}."
        
        return response
    finally:
        db.close()
