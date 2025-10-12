import React, { useState } from 'react';

const ResultsView = ({ scanData }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedFindings, setExpandedFindings] = useState([]);

  const findings = [
    {
      id: 1,
      severity: 'critical',
      category: 'Network',
      title: 'Port 22/CP - OpenSSH 8.2p1 (Outdated)',
      description: 'Outdated SSH version detected with known vulnerabilities',
      cve: 'CVE-2023-12345',
      exploits: 2,
      remediation: 'Update OpenSSH to version 9.0 or later. Apply security patches immediately.'
    },
    {
      id: 2,
      severity: 'high',
      category: 'SSL',
      title: 'Port 443/CP - TLS 1.0 Enabled',
      description: 'Deprecated TLS 1.0 protocol is still enabled, vulnerable to POODLE attacks',
      cve: 'CVE-2014-3566',
      exploits: 0,
      remediation: 'Disable TLS 1.0 and 1.1. Enable only TLS 1.2 and 1.3 protocols.'
    },
    {
      id: 3,
      severity: 'high',
      category: 'Web',
      title: 'Missing Security Headers',
      description: 'Critical security headers not implemented: X-Frame-Options, CSP',
      cve: null,
      exploits: 0,
      remediation: 'Implement Content-Security-Policy, X-Frame-Options, and X-XSS-Protection headers.'
    },
    {
      id: 4,
      severity: 'medium',
      category: 'Network',
      title: 'Weak Cipher Suites Detected',
      description: 'Server accepts weak cipher suites that may be vulnerable',
      cve: null,
      exploits: 0,
      remediation: 'Configure server to only accept strong cipher suites (AES-256-GCM, ChaCha20).'
    },
    {
      id: 5,
      severity: 'low',
      category: 'Web',
      title: 'Directory Listing Enabled',
      description: 'Web server allows directory browsing exposing file structure',
      cve: null,
      exploits: 0,
      remediation: 'Disable directory listing in web server configuration.'
    }
  ];

  const filteredFindings = selectedFilter === 'all' 
    ? findings 
    : findings.filter(f => f.severity === selectedFilter);

  const severityCounts = {
    critical: findings.filter(f => f.severity === 'critical').length,
    high: findings.filter(f => f.severity === 'high').length,
    medium: findings.filter(f => f.severity === 'medium').length,
    low: findings.filter(f => f.severity === 'low').length
  };

  const riskScore = 72;

  const toggleExpand = (id) => {
    setExpandedFindings(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getSeverityColor = (severity) => {
    const colorMap = {
      critical: { bg: 'bg-red-500/10', border: 'border-red-500', badge: 'bg-red-500/20 text-red-300', text: 'text-red-400' },
      high: { bg: 'bg-orange-500/10', border: 'border-orange-500', badge: 'bg-orange-500/20 text-orange-300', text: 'text-orange-400' },
      medium: { bg: 'bg-yellow-500/10', border: 'border-yellow-500', badge: 'bg-yellow-500/20 text-yellow-300', text: 'text-yellow-400' },
      low: { bg: 'bg-blue-500/10', border: 'border-blue-500', badge: 'bg-blue-500/20 text-blue-300', text: 'text-blue-400' }
    };
    return colorMap[severity] || colorMap.low;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-0 -left-20"></div>
        <div className="absolute w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse bottom-0 -right-20" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 flex items-center justify-between" style={{animation: 'fadeIn 0.8s ease-out'}}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                SCAN RESULTS FOR 192.168.1.101
              </h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400 flex-wrap">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                  </svg>
                  Scan ID: #ASDN-1934-AKLS
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  2023-10-27 14:35:12 UTC
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1 bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl" style={{animation: 'slideUp 0.8s ease-out'}}>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#1e293b" strokeWidth="8"/>
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="56" 
                    fill="none" 
                    stroke="url(#gradient)" 
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - riskScore / 100)}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <div className="text-4xl font-bold text-red-400">{riskScore}</div>
                    <div className="text-xs text-gray-400">RISK SCORE</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-red-500/10 rounded-lg border border-red-500/30">
                  <span className="text-sm text-red-300">Critical</span>
                  <span className="text-lg font-bold text-red-400">{severityCounts.critical}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-500/10 rounded-lg border border-orange-500/30">
                  <span className="text-sm text-orange-300">High</span>
                  <span className="text-lg font-bold text-orange-400">{severityCounts.high}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <span className="text-sm text-yellow-300">Medium</span>
                  <span className="text-lg font-bold text-yellow-400">{severityCounts.medium}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <span className="text-sm text-blue-300">Low</span>
                  <span className="text-lg font-bold text-blue-400">{severityCounts.low}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30 shadow-2xl" style={{animation: 'slideUp 0.8s ease-out 0.1s backwards'}}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-300">CRITICAL VULNERABILITIES FOUND!</h3>
                    <p className="text-red-400 text-sm">Potential Exploits: 2</p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg whitespace-nowrap">
                  View Details
                </button>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden" style={{animation: 'slideUp 0.8s ease-out 0.2s backwards'}}>
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    VULNERABILITY DETAILS ({filteredFindings.length})
                  </h2>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {['all', 'critical', 'high', 'medium', 'low'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                        selectedFilter === filter
                          ? filter === 'all' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg' :
                            filter === 'critical' ? 'bg-red-600 text-white shadow-lg' :
                            filter === 'high' ? 'bg-orange-600 text-white shadow-lg' :
                            filter === 'medium' ? 'bg-yellow-600 text-white shadow-lg' :
                            'bg-blue-600 text-white shadow-lg'
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)} ({filter === 'all' ? findings.length : severityCounts[filter]})
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-4">
                {filteredFindings.map((finding) => {
                  const colors = getSeverityColor(finding.severity);
                  return (
                    <div
                      key={finding.id}
                      className={`border-l-4 ${colors.border} ${colors.bg} rounded-lg p-4 hover:bg-opacity-70 transition-all cursor-pointer`}
                      onClick={() => toggleExpand(finding.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors.badge} border ${colors.border}/30`}>
                              {finding.severity.toUpperCase()}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-cyan-300">
                              {finding.category}
                            </span>
                            {finding.cve && (
                              <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                {finding.cve}
                              </span>
                            )}
                          </div>
                          <h3 className={`text-lg font-bold ${colors.text} mb-1`}>
                            {finding.title}
                          </h3>
                          <p className="text-gray-400 text-sm">{finding.description}</p>
                          
                          {expandedFindings.includes(finding.id) && (
                            <div className="mt-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg" style={{animation: 'slideDown 0.3s ease-out'}}>
                              <h4 className="text-cyan-300 font-semibold text-sm mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                Remediation Steps
                              </h4>
                              <p className="text-gray-300 text-sm">{finding.remediation}</p>
                              {finding.exploits > 0 && (
                                <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                  </svg>
                                  <span className="font-bold">{finding.exploits} known exploit(s)</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <svg 
                          className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${expandedFindings.includes(finding.id) ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/50 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              DOWNLOAD FULL REPORT (PDF)
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from { 
            opacity: 0;
            max-height: 0;
          }
          to { 
            opacity: 1;
            max-height: 500px;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultsView;