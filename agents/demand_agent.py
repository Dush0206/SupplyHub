import json
import xgboost as xgb
import pandas as pd
import shap

def get_demand_forecast(query: str) -> str:
    """
    Simulates a specialized agent that interfaces with the Demand Forecasting ML model.
    """
    model_path = "models/saved/xgboost_demand.json"
    try:
        model = xgb.XGBRegressor()
        model.load_model(model_path)
        
        # Dummy inference: predicting for month=12, year=2026
        df_inference = pd.DataFrame({"month": [12], "year": [2026]})
        prediction = model.predict(df_inference)[0]
        
        # Explainable AI via SHAP
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(df_inference)
        
        # Simple text explanation of the top factor
        importance = "month (seasonality)" if abs(shap_values[0][0]) > abs(shap_values[0][1]) else "year (trend)"
        
        return f"Based on the trained model, the forecasted demand is approximately {prediction:.2f} units. SHAP XAI Analysis indicates that '{importance}' was the most significant factor driving this prediction."
    except Exception as e:
        return "Demand forecast model is not available. Please train the model first using models/demand_forecast.py."

