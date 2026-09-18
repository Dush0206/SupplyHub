import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', sales: 400000, forecast: null },
  { name: 'Feb', sales: 380000, forecast: null },
  { name: 'Mar', sales: 420000, forecast: null },
  { name: 'Apr', sales: 450000, forecast: null },
  { name: 'May', sales: 460000, forecast: null },
  { name: 'Jun', sales: 480000, forecast: null },
  { name: 'Jul', sales: 500000, forecast: null },
  { name: 'Aug', sales: 490000, forecast: null },
  { name: 'Sep', sales: 470000, forecast: null },
  { name: 'Oct', sales: 510000, forecast: null },
  { name: 'Nov', sales: 620000, forecast: null },
  { name: 'Dec', sales: 710000, forecast: null },
  { name: 'Jan (Next)', sales: null, forecast: 42500 }
];

const DemandChart = () => {
  return (
    <div style={{ width: '100%', height: 300, marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>12-Month Demand vs Forecast</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)' }}
            itemStyle={{ color: '#fff' }}
          />
          <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="forecast" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DemandChart;
