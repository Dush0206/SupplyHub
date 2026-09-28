import React, { useState } from 'react';
import { Database, Filter, Sliders, Split, Cpu, CheckCircle2, TrendingUp, ArrowDown } from 'lucide-react';

const MLPipeline = () => {
  const [selectedStage, setSelectedStage] = useState(0);

  const pipelineStages = [
    {
      title: '1. Data Collection',
      icon: Database,
      desc: 'Ingests multi-source sales, pricing, promotional, and seasonal features.',
      details: [
        'Historical Sales (90+ Days)',
        'Unit Pricing & Discount History',
        'Promotional Campaign Schedules',
        'Holiday & Calendar Markers',
        'Regional Seasonality Patterns',
        'Geographic Hub Location Data'
      ]
    },
    {
      title: '2. Data Preprocessing',
      icon: Filter,
      desc: 'Cleans outliers, handles missing timestamps, and normalizes variance.',
      details: [
        'Missing Value Imputation (Linear Interpolation)',
        'Outlier Removal via Z-Score Filtering',
        'Timestamp Uniform Formatting (ISO 8601)',
        'Unit Price Standard Scaling'
      ]
    },
    {
      title: '3. Feature Engineering',
      icon: Sliders,
      desc: 'Derives temporal signals, rolling window aggregates, and lead metrics.',
      details: [
        'Time Features (Day of Week, Month, Quarter, IsWeekend)',
        'Lag Features (Lag 7, Lag 14, Lag 30 Days)',
        'Rolling Statistics (7d Rolling Mean & Standard Dev)',
        'Promotion Features (Promo Flag, Promo Interaction)',
        'Price Features (Price Sensitivity Index)',
        'Location Features (Hub Density Code)'
      ]
    },
    {
      title: '4. Train/Test Split',
      icon: Split,
      desc: 'Splits time series sequentially without lookahead bias.',
      details: [
        'Training Set: 80% (First 72 Days)',
        'Testing Set: 20% (Latest 18 Days)',
        'Time-Series Cross Validation (5 Folds)'
      ]
    },
    {
      title: '5. Model Training',
      icon: Cpu,
      desc: 'Trains gradient-boosted trees and deep learning architectures.',
      details: [
        'XGBoost Regressor (n_estimators=500, max_depth=6)',
        'LightGBM Regressor (learning_rate=0.03)',
        'SARIMA Time Series Model (p,d,q = 2,1,2)',
        'LSTM Neural Network (Hidden Units = 64)'
      ]
    },
    {
      title: '6. Model Evaluation',
      icon: CheckCircle2,
      desc: 'Measures residual error across evaluation metrics.',
      details: [
        'Mean Absolute Error (MAE): 142.5',
        'Root Mean Square Error (RMSE): 185.2',
        'Mean Absolute Percentage Error (MAPE): 3.8%',
        'R-Squared Score (R²): 0.96'
      ]
    },
    {
      title: '7. Demand Prediction & Output',
      icon: TrendingUp,
      desc: 'Generates point predictions with 95% confidence intervals.',
      details: [
        '30-Day Point Demand Estimate',
        'Upper & Lower 95% Confidence Bounds',
        'Integration with Inventory Reorder Point Engine',
        'Automated Supply Chain Alert Dispatch'
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>Demand Prediction Workflow</h1>
        <p style={{ margin: '0.25rem 0 0 0', color: '#64748B', fontSize: '0.9rem' }}>End-to-end Machine Learning data pipeline architecture and feature engineering stages</p>
      </div>

      {/* Interactive Workflow Diagram */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {pipelineStages.map((stage, idx) => {
          const IconComponent = stage.icon;
          const isSelected = selectedStage === idx;
          return (
            <div 
              key={idx}
              onClick={() => setSelectedStage(idx)}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                background: isSelected ? '#F0F9FF' : '#fff',
                borderRadius: '12px',
                border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 4px 14px rgba(37,99,235,0.15)' : '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ width: '34px', height: '34px', background: isSelected ? '#2563EB' : '#F1F5F9', color: isSelected ? '#fff' : '#0F172A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconComponent size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>{stage.title}</h3>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>{stage.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <div className="glass-panel" style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', borderLeft: '4px solid #2563EB' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>
          Detailed Breakdown: {pipelineStages[selectedStage].title}
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748B', fontSize: '0.85rem' }}>
          {pipelineStages[selectedStage].desc}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {pipelineStages[selectedStage].details.map((detail, dIdx) => (
            <div key={dIdx} style={{ padding: '0.65rem 0.85rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="#10B981" /> {detail}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MLPipeline;
