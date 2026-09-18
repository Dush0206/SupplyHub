import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Truck, Bot, Bell, Search, User, Database, FileText, Activity, Key } from 'lucide-react';

const Layout = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const isSupplier = user?.role === 'supplier';

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar glass-panel" style={{ borderRadius: 0, borderTop: 0, borderBottom: 0, borderLeft: 0 }}>
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>S</div>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>SupplyHub OS</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </NavLink>
          
          {!isSupplier && (
            <>
              <NavLink to="/inventory" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                <Package size={20} />
                <span>Inventory</span>
              </NavLink>
              
              <NavLink to="/suppliers" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                <Truck size={20} />
                <span>Suppliers</span>
              </NavLink>
            </>
          )}

          <NavLink to="/pos" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <FileText size={20} />
            <span>Purchase Orders</span>
          </NavLink>

          {!isSupplier && (
            <>
              <NavLink to="/scenarios" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                <Activity size={20} />
                <span>What-If Scenarios</span>
              </NavLink>
              
              <NavLink to="/pipeline" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                <Database size={20} />
                <span>ML Pipeline</span>
              </NavLink>

              <NavLink to="/integrations" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                <Key size={20} />
                <span>API & Integrations</span>
              </NavLink>

              <NavLink to="/ai" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', borderRadius: 0 }}>
                <Bot size={20} />
                <span>AI Orchestrator</span>
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Top Header */}
        <header className="global-header">
          <div style={{ position: 'relative' }}>
            {!isSupplier && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', width: '300px' }}>
                <Search size={18} color="var(--text-secondary)" />
                <input 
                  type="text" 
                  placeholder="Search POs, SKU, or Suppliers..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '0.875rem' }} 
                />
              </div>
            )}
            
            {searchQuery && !isSupplier && (
              <div style={{ position: 'absolute', top: '115%', left: 0, right: 0, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 100 }}>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Global Search Results
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                   <div 
                     style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s' }} 
                     onClick={() => { setSearchQuery(''); navigate('/inventory'); }}
                     onMouseOver={(e) => e.currentTarget.style.background = 'var(--border-color)'}
                     onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                   >
                     📦 Check <strong>Inventory</strong> for "{searchQuery}"
                   </div>
                   <div 
                     style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s' }} 
                     onClick={() => { setSearchQuery(''); navigate('/suppliers'); }}
                     onMouseOver={(e) => e.currentTarget.style.background = 'var(--border-color)'}
                     onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                   >
                     🚚 Check <strong>Suppliers</strong> for "{searchQuery}"
                   </div>
                   <div 
                     style={{ padding: '0.75rem', background: 'var(--primary)', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s' }} 
                     onClick={() => { setSearchQuery(''); navigate('/ai'); }}
                     onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                     onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                   >
                     🤖 Ask AI Orchestrator about "{searchQuery}"
                   </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell size={20} color="var(--text-secondary)" />
              <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%' }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border-color)' }}>
              <div style={{ width: '32px', height: '32px', background: 'var(--primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase' }}>
                <User size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {isSupplier ? 'Supplier Portal' : 'Admin User'}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {isSupplier ? 'Vendor Access' : 'Supply Chain Mgr'}
                </span>
              </div>
              <button onClick={onLogout} className="text-btn" style={{ fontSize: '0.75rem', color: 'var(--danger)' }}>
                Log Out
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
