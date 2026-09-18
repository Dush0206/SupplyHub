import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Inventory from './pages/Inventory';
import Suppliers from './pages/Suppliers';
import AIOrchestrator from './pages/AIOrchestrator';
import MLPipeline from './pages/MLPipeline';
import PurchaseOrders from './pages/PurchaseOrders';
import Scenarios from './pages/Scenarios';
import APIIntegrations from './pages/APIIntegrations';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={(userObj) => setUser(userObj)} />;
  }

  // Define allowed routes based on role
  const isSupplier = user.role === 'supplier';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={() => setUser(null)} />}>
          <Route index element={<Dashboard />} />
          {!isSupplier && <Route path="inventory" element={<Inventory />} />}
          {!isSupplier && <Route path="suppliers" element={<Suppliers />} />}
          {!isSupplier && <Route path="pipeline" element={<MLPipeline />} />}
          <Route path="pos" element={<PurchaseOrders />} />
          {!isSupplier && <Route path="scenarios" element={<Scenarios />} />}
          {!isSupplier && <Route path="integrations" element={<APIIntegrations />} />}
          {!isSupplier && <Route path="ai" element={<AIOrchestrator />} />}
          
          {/* Fallback for unauthorized access */}
          {isSupplier && <Route path="*" element={<Navigate to="/" replace />} />}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
