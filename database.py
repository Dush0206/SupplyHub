from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./supply_chain.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Inventory(Base):
    __tablename__ = "inventory"
    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String, index=True)
    quantity = Column(Integer)
    safety_stock = Column(Integer)
    avg_daily_usage = Column(Float)
    eoq = Column(Integer, default=0)
    expiry_date = Column(String, default="N/A")
    spoilage_risk = Column(String, default="Low")
    status = Column(String, default="Healthy")

class Supplier(Base):
    __tablename__ = "suppliers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    reliability_score = Column(Float)
    lead_time_days = Column(Integer)
    price_index = Column(Float)
    status = Column(String, default="Active")
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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
