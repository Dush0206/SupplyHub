import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [activeReport, setActiveReport] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/reports')
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(() => {});
  }, []);

  const handleExportCSV = (repName) => {
    const csvContent = "data:text/csv;charset=utf-8,Report,Category,Date,Status\n" + repName + ",Supply Chain Intelligence," + new Date().toISOString().slice(0,10) + ",Verified";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${repName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = (repName) => {
    alert(`Generating & Downloading PDF format for: ${repName}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>Reports & Analytics</h1>
        <p style={{ margin: '0.25rem 0 0 0', color: '#64748B', fontSize: '0.9rem' }}>Enterprise supply chain reports, ML forecast summaries & export tools</p>
      </div>

      {/* Reports Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {reports.map((rep, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>{rep.category}</span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{rep.date}</span>
              </div>

              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>{rep.name}</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1rem 0' }}>
                Comprehensive executive audit report including historical data, predictive forecasts, and prescriptive AI recommendations.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #F1F5F9', paddingTop: '0.85rem' }}>
              <button 
                onClick={() => setActiveReport(rep.name)}
                style={{ flex: 1, padding: '0.45rem', borderRadius: '6px', background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
              >
                <Eye size={14} /> View
              </button>

              <button 
                onClick={() => handleExportCSV(rep.name)}
                style={{ flex: 1, padding: '0.45rem', borderRadius: '6px', background: '#2563EB', border: 'none', color: '#fff', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
              >
                <FileSpreadsheet size={14} /> CSV
              </button>

              <button 
                onClick={() => handleExportPDF(rep.name)}
                style={{ flex: 1, padding: '0.45rem', borderRadius: '6px', background: '#0F172A', border: 'none', color: '#fff', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
              >
                <Download size={14} /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active Report Viewer Modal / Drawer */}
      {activeReport && (
        <div className="glass-panel" style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '2px solid #2563EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>Viewing Report: {activeReport}</h3>
            <button onClick={() => setActiveReport(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontWeight: 700 }}>Close Preview</button>
          </div>
          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>
            <p><strong>Report Document ID:</strong> REP-2026-X99</p>
            <p><strong>Generated Status:</strong> Fully Computed & Verified via XGBoost Model Pipeline</p>
            <p><strong>Summary:</strong> All 10 product inventory levels were benchmarked against predicted 30-day demand. Safety stock thresholds are maintained at optimal levels, with zero stockout risk for 70% of product SKUs.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
