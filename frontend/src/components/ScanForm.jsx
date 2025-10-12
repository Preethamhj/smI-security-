import React, { useState } from 'react';

const ScanForm = ({ onScanSubmit }) => {
  const [target, setTarget] = useState('');
  const [scanType, setScanType] = useState('quick');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateInput = (input) => {
    const domainRegex = /^(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3})$/;
    return domainRegex.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!target.trim()) {
      setError('Please enter a target domain or IP address');
      return;
    }

    if (!validateInput(target)) {
      setError('Invalid domain or IP format. Example: example.com or 192.168.1.1');
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onScanSubmit) {
        onScanSubmit({ target, scanType });
      }
    } catch (err) {
      setError('Failed to initiate scan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-0 -left-20"></div>
        <div className="absolute w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse bottom-0 -right-20" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="w-full max-w-2xl relative z-10" style={{animation: 'fadeIn 0.8s ease-out'}}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-2xl shadow-blue-500/50" style={{animation: 'float 3s ease-in-out infinite'}}>
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-2">
            Network Security Scan
          </h1>
          <p className="text-gray-400">Enter a domain or IP address to begin security assessment</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700/50" style={{animation: 'slideUp 0.8s ease-out'}}>
          <div className="space-y-6">
            <div>
              <label className="text-cyan-300 text-sm font-semibold block mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
                Target Domain or IP Address
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="example.com or 192.168.1.1"
                  className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all pr-12"
                  disabled={loading}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400 opacity-0 group-focus-within:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="text-cyan-300 text-sm font-semibold block mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
                Scan Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setScanType('quick')}
                  disabled={loading}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    scanType === 'quick'
                      ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                      : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <svg className={`w-8 h-8 ${scanType === 'quick' ? 'text-cyan-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <p className={`font-semibold ${scanType === 'quick' ? 'text-cyan-300' : 'text-gray-400'}`}>Quick Scan</p>
                  <p className="text-xs text-gray-500 mt-1">~2-3 minutes</p>
                </button>

                <button
                  type="button"
                  onClick={() => setScanType('full')}
                  disabled={loading}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    scanType === 'full'
                      ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                      : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <svg className={`w-8 h-8 ${scanType === 'full' ? 'text-cyan-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <p className={`font-semibold ${scanType === 'full' ? 'text-cyan-300' : 'text-gray-400'}`}>Full Deep Scan</p>
                  <p className="text-xs text-gray-500 mt-1">~10-15 minutes</p>
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3" style={{animation: 'shake 0.3s ease-in-out'}}>
                <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-105 transition-all shadow-lg shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Initiating Scan...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                  Start Security Scan
                </span>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              All scans are performed securely and ethically
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/30">
          <h3 className="text-cyan-300 font-semibold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            What we'll scan:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
              Open ports and services
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              SSL/TLS configuration
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              Known vulnerabilities (CVEs)
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              HTTP security headers
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default ScanForm;