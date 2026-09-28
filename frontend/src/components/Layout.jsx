import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Package, 
  Truck, 
  MapPin, 
  Bot, 
  Activity, 
  Bell, 
  FileSpreadsheet, 
  Workflow, 
  Search, 
  User, 
  LogOut 
} from 'lucide-react';

const Layout = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar glass-panel" style={{ borderRadius: 0, borderTop: 0, borderBottom: 0, borderLeft: 0, minWidth: '240px' }}>
        <div style={{ padding: '0.5rem 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>S</div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>SupplyHub OS</h2>
            <span style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Intelligence</span>
          </div>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/forecast" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
            <TrendingUp size={18} />
            <span>Demand Forecast</span>
          </NavLink>

          <NavLink to="/inventory" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
            <Package size={18} />
            <span>Inventory</span>
          </NavLink>

          <NavLink to="/suppliers" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
            <Truck size={18} />
            <span>Suppliers</span>
          </NavLink>

          <NavLink to="/logistics" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
            <MapPin size={18} />
            <span>Logistics</span>
          </NavLink>

          <NavLink to="/ai" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
            <Bot size={18} />
            <span>AI Recommendations</span>
          </NavLink>

          <NavLink to="/scenarios" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
            <Activity size={18} />
            <span>What-If Analysis</span>
          </NavLink>

          <NavLink to="/alerts" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
            <Bell size={18} />
            <span>Alert Center</span>
          </NavLink>

          <NavLink to="/reports" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
            <FileSpreadsheet size={18} />
            <span>Reports</span>
          </NavLink>

          <NavLink to="/pipeline" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500, marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
            <Workflow size={18} />
            <span>ML Pipeline Flow</span>
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Top Header */}
        <header className="global-header" style={{ padding: '0.85rem 1.5rem', background: '#fff', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-tertiary)', padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', width: '320px' }}>
              <Search size={16} color="var(--text-secondary)" />
              <input 
                type="text" 
                placeholder="Search products, SKUs, suppliers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '0.85rem' }} 
              />
            </div>
            
            {searchQuery && (
              <div style={{ position: 'absolute', top: '115%', left: 0, right: 0, background: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.75rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', zIndex: 100 }}>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Search Quick Links</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                   <div style={{ padding: '0.5rem', background: 'var(--bg-tertiary)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }} onClick={() => { setSearchQuery(''); navigate('/inventory'); }}>
                     📦 View Inventory for "{searchQuery}"
                   </div>
                   <div style={{ padding: '0.5rem', background: 'var(--bg-tertiary)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }} onClick={() => { setSearchQuery(''); navigate('/forecast'); }}>
                     📈 View Demand Forecast for "{searchQuery}"
                   </div>
                   <div style={{ padding: '0.5rem', background: '#2563EB', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }} onClick={() => { setSearchQuery(''); navigate('/ai'); }}>
                     🤖 Ask AI Assistant about "{searchQuery}"
                   </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button 
              onClick={() => navigate('/alerts')} 
              style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem', borderRadius: '6px' }}
            >
              <Bell size={20} color="var(--text-secondary)" />
              <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%' }}></span>
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border-color)' }}>
              <div style={{ width: '34px', height: '34px', background: '#0F172A', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.9rem' }}>
                <User size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Supply Chain Mgr</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Enterprise Admin</span>
              </div>
              {onLogout && (
                <button onClick={onLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', marginLeft: '0.5rem' }}>
                  <LogOut size={16} />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="main-content" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', background: 'var(--bg-primary)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
