import React, { useState, useEffect } from 'react';
import { ShieldCheck, Key, Lock, Building, UserPlus } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginRole, setLoginRole] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Mock database using localStorage
  useEffect(() => {
    const existingUsers = localStorage.getItem('supplyhub_users');
    if (!existingUsers) {
      localStorage.setItem('supplyhub_users', JSON.stringify({ 'admin': 'password' }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    let users = JSON.parse(localStorage.getItem('supplyhub_users')) || {};
    
    // Auto-migrate old string-based mock DB to new strict object-based RBAC DB
    if (users && typeof users['admin'] === 'string') {
        users = { 'admin': { password: 'password', role: 'admin' } };
        localStorage.setItem('supplyhub_users', JSON.stringify(users));
    }

    if (isSignUp) {
      if (users[username]) {
        setError('An account with this email/ID already exists.');
      } else if (password.length < 6) {
        setError('Password must be at least 6 characters.');
      } else {
        // Save the strict role they are registering for
        users[username] = { password, role: loginRole };
        localStorage.setItem('supplyhub_users', JSON.stringify(users));
        setSuccessMsg(`Account successfully created for ${loginRole === 'admin' ? 'Admin' : 'Supplier'} Portal! You can now sign in.`);
        setIsSignUp(false); // Switch back to login
        setPassword(''); // clear password for them to re-type
      }
    } else {
      // Sign In Logic with Strict RBAC Role Validation
      const userRecord = users[username];
      if (userRecord && userRecord.password === password) {
        if (userRecord.role !== loginRole) {
          setError(`Access Denied: This account does not have access to the ${loginRole === 'admin' ? 'Admin' : 'Supplier'} Portal.`);
        } else {
          onLogin({ username, role: userRecord.role });
        }
      } else {
        setError('Invalid credentials or unauthorized access attempt detected.');
      }
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccessMsg('');
    setPassword('');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-tertiary)' }}>
      {/* Left side: Branding / Security */}
      <div style={{ flex: 1, background: 'var(--primary)', color: '#fff', display: 'flex', flexDirection: 'column', padding: '4rem', justifyContent: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <ShieldCheck size={64} style={{ marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>SupplyHub OS</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, lineHeight: 1.5, maxWidth: '500px' }}>
            Enterprise-Grade AI Supply Chain Orchestration. <br />
            Secured via Zero-Trust Architecture.
          </p>
        </div>
        
        <div style={{ marginTop: 'auto', display: 'flex', gap: '2rem', opacity: 0.8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={18} />
            <span>End-to-End Encrypted</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building size={18} />
            <span>SOC2 Type II Certified</span>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '420px', padding: '2rem' }}>
          
          {/* Role Selection Tabs */}
          {!isSignUp && (
            <div style={{ display: 'flex', background: 'var(--bg-tertiary)', padding: '0.25rem', borderRadius: '8px', marginBottom: '2rem' }}>
              <button 
                type="button"
                onClick={() => setLoginRole('admin')}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: 'none', background: loginRole === 'admin' ? 'var(--primary)' : 'transparent', color: loginRole === 'admin' ? '#fff' : 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                Admin Portal
              </button>
              <button 
                type="button"
                onClick={() => setLoginRole('supplier')}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: 'none', background: loginRole === 'supplier' ? 'var(--primary)' : 'transparent', color: loginRole === 'supplier' ? '#fff' : 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                Supplier Portal
              </button>
            </div>
          )}

          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '50%', marginBottom: '1rem' }}>
              {isSignUp ? <UserPlus size={24} color="var(--primary)" /> : <Key size={24} color="var(--primary)" />}
            </div>
            <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: '1.75rem' }}>
              {isSignUp ? 'Create Account' : (loginRole === 'admin' ? 'Authorized Access Only' : 'Vendor Management')}
            </h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              {isSignUp ? 'Register your enterprise credentials below.' : (loginRole === 'admin' ? 'Enter your corporate admin credentials.' : 'Enter your approved vendor credentials.')}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {loginRole === 'admin' ? 'Corporate Email / ID' : 'Vendor ID / Email'}
              </label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={loginRole === 'admin' ? "admin@company.com" : "vendor@supplier.com"}
                style={{ width: '100%', padding: '0.875rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '0.875rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                required
              />
            </div>

            {error && <div style={{ color: 'var(--danger)', fontSize: '0.875rem', padding: '0.75rem', background: 'var(--danger-bg)', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={16} />
              {error}
            </div>}

            {successMsg && <div style={{ color: 'var(--success)', fontSize: '0.875rem', padding: '0.75rem', background: 'var(--success-bg)', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} />
              {successMsg}
            </div>}

            <button type="submit" className="enterprise-btn" style={{ justifyContent: 'center', padding: '1rem', marginTop: '0.5rem', fontSize: '1rem' }}>
              {isSignUp ? 'Register Account' : `Sign In to ${loginRole === 'admin' ? 'Admin' : 'Supplier'} Portal`}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button onClick={toggleMode} className="text-btn" style={{ fontSize: '0.875rem' }}>
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Request Access / Sign Up'}
            </button>
          </div>

          {!isSignUp && (
            <>
              <div style={{ marginTop: '2rem', position: 'relative', textAlign: 'center' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px solid var(--border-color)' }}></div>
                <span style={{ position: 'relative', background: 'var(--bg-secondary)', padding: '0 1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>OR</span>
              </div>

              <button type="button" className="enterprise-btn" style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '2rem', background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
                Sign in with Azure Active Directory (SSO)
              </button>
              <button type="button" className="enterprise-btn" style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '1rem', background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
                Sign in with Google Workspace
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;
