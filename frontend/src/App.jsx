import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import DemandForecasting from './pages/DemandForecasting';
import Inventory from './pages/Inventory';
import Suppliers from './pages/Suppliers';
import Logistics from './pages/Logistics';
import AIOrchestrator from './pages/AIOrchestrator';
import Scenarios from './pages/Scenarios';
import AlertCenter from './pages/AlertCenter';
import Reports from './pages/Reports';
import MLPipeline from './pages/MLPipeline';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState({ name: 'Admin User', role: 'admin' });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={() => setUser(null)} />}>
          <Route index element={<Dashboard />} />
          <Route path="forecast" element={<DemandForecasting />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="logistics" element={<Logistics />} />
          <Route path="ai" element={<AIOrchestrator />} />
          <Route path="scenarios" element={<Scenarios />} />
          <Route path="alerts" element={<AlertCenter />} />
          <Route path="reports" element={<Reports />} />
          <Route path="pipeline" element={<MLPipeline />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
