import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

def train_demand_model(data_path: str = "data/raw_data.csv", model_path: str = "models/saved/xgboost_demand.json"):
    """
    Trains an XGBoost model on the historical sales data to predict future demand.
    """
    try:
        df = pd.read_csv(data_path)
    except FileNotFoundError:
        print(f"Data file not found at {data_path}. Please run fetch_data.py first.")
        return

    # Basic Feature Engineering
    df['date'] = pd.to_datetime(df['date'])
    df['month'] = df['date'].dt.month
    df['year'] = df['date'].dt.year
    
    # Target and Features
    X = df[['month', 'year']]
    y = df['sales']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train Model
    model = xgb.XGBRegressor(objective='reg:squarederror', n_estimators=100)
    model.fit(X_train, y_train)
    
    # Evaluate Model
    predictions = model.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    print(f"Model trained. Mean Squared Error: {mse:.2f}")
    
    # Save Model
    import os
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    model.save_model(model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_demand_model()
