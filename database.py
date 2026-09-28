from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

DATABASE_URL = "sqlite:///./supply_chain.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String, unique=True, index=True)
    item_name = Column(String, index=True)
    category = Column(String, default="Electronics")
    unit_price = Column(Float, default=100.0)
    quantity = Column(Integer, default=1000)
    safety_stock = Column(Integer, default=200)
    reorder_point = Column(Integer, default=400)
    avg_daily_usage = Column(Float, default=50.0)
    eoq = Column(Integer, default=300)
    spoilage_risk = Column(String, default="Low")
    status = Column(String, default="Healthy")
    location = Column(String, default="Chennai Hub")

class Inventory(Base):
    __tablename__ = "inventory"
    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String, index=True)
    quantity = Column(Integer)
    safety_stock = Column(Integer)
    avg_daily_usage = Column(Float)
    eoq = Column(Integer, default=0)
    reorder_point = Column(Integer, default=0)
    predicted_demand = Column(Integer, default=0)
    stockout_risk_pct = Column(Float, default=0.0)
    expiry_date = Column(String, default="N/A")
    spoilage_risk = Column(String, default="Low")
    status = Column(String, default="Healthy")
    location = Column(String, default="Chennai Hub")

class SalesHistory(Base):
    __tablename__ = "sales_history"
    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, index=True)
    location = Column(String, default="Chennai Hub")
    date = Column(String)
    quantity_sold = Column(Integer)
    unit_price = Column(Float)
    promotion_active = Column(Boolean, default=False)
    is_holiday = Column(Boolean, default=False)

class Supplier(Base):
    __tablename__ = "suppliers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    reliability_score = Column(Float)
    lead_time_days = Column(Integer)
    price_index = Column(Float)
    quality_score = Column(Float, default=0.95)
    capacity_risk = Column(String, default="Low")
    status = Column(String, default="Active")
    risk_level = Column(String, default="Low Risk")
    location = Column(String, default="Global")
    lat = Column(Float, default=0.0)
    lng = Column(Float, default=0.0)

class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"
    id = Column(String, primary_key=True, index=True)
    supplier = Column(String)
    item = Column(String)
    quantity = Column(Integer)
    total_cost = Column(Float)
    ai_confidence = Column(Integer)
    status = Column(String)
    urgency = Column(String)
    created_at = Column(String, default=lambda: datetime.date.today().isoformat())

class LogisticsRoute(Base):
    __tablename__ = "logistics_routes"
    id = Column(Integer, primary_key=True, index=True)
    origin = Column(String)
    destination = Column(String)
    vehicle_capacity = Column(String, default="10 Ton Truck")
    delivery_deadline_hrs = Column(Float, default=24.0)
    recommended_route = Column(String)
    distance_km = Column(Float)
    estimated_time_hrs = Column(Float)
    cost_inr = Column(Float)

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    severity = Column(String) # Critical, Warning, Info, Demand, Anomaly
    category = Column(String)
    product = Column(String)
    location = Column(String)
    message = Column(Text)
    expected_date = Column(String)
    recommended_action = Column(Text)

class Recommendation(Base):
    __tablename__ = "recommendations"
    id = Column(Integer, primary_key=True, index=True)
    product = Column(String)
    current_inventory = Column(Integer)
    predicted_demand = Column(Integer)
    safety_stock = Column(Integer)
    reorder_point = Column(Integer)
    recommended_order = Column(Integer)
    recommended_order_date = Column(String)
    explanation = Column(Text)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
