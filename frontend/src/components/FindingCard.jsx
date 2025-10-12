import React, { useState } from 'react';

const FindingCard = ({ finding }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  const getSeverityColor = (severity) => {
    const colors = {
      critical: { bg: 'bg-red-500/10', border: 'border-red-500', text: 'text-red-400', badge: 'bg-red-500/20 text-red-300' },
      high: { bg: 'bg-orange-500/10', border: 'border-orange-500', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-300' },
      medium: { bg: 'bg-yellow-500/10', border: 'border-yellow-500', text: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-300' },
      low: { bg: 'bg-blue-500/10', border: 'border-blue-500', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300' }
    };
    return colors[severity] || colors.low;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Network: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
        </svg>
      ),
      SSL: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      ),
      Web: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    };
    return icons[category] || icons.Network;
  };

  const colors = getSeverityColor(finding.severity);

  return (
    <div className={`${colors.bg} border-l-4 ${colors.border} rounded-lg p-4 backdrop-blur-sm transition-all hover:scale-[1.02] ${isResolved ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${colors.badge} border ${colors.border}/30`}>
              {finding.severity}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-cyan-300 flex items-center gap-1">
              {getCategoryIcon(finding.category)}
              {finding.category}
            </span>
            {finding.cve && (
              <a 
                href={`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${finding.cve}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-all"
              >
                {finding.cve}
              </a>
            )}
            {finding.exploits > 0 && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600/30 text-red-300 border border-red-600/50 animate-pulse flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                {finding.exploits} Exploit{finding.exploits > 1 ? 's' : ''}
              </span>
            )}
            {isResolved && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Resolved
              </span>
            )}
          </div>

          <h3 className={`text-lg font-bold ${colors.text} mb-2 flex items-start gap-2`}>
            <span className="flex-shrink-0 mt-1">[{finding.severity.toUpperCase()}]</span>
            <span className={isResolved ? 'line-through' : ''}>{finding.title}</span>
          </h3>

          <p className="text-gray-400 text-sm mb-3">{finding.description}</p>

          {isExpanded && (
            <div className="mt-4 space-y-4 animate-slide-down">
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                <h4 className="text-cyan-300 font-semibold text-sm mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Remediation Steps
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">{finding.remediation}</p>
              </div>

              {finding.technical_details && (
                <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                  <h4 className="text-cyan-300 font-semibold text-sm mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                    </svg>
                    Technical Details
                  </h4>
                  <pre className="text-gray-400 text-xs font-mono overflow-x-auto">{finding.technical_details}</pre>
                </div>
              )}

              <div className="flex gap-3">
                {!isResolved && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsResolved(true);
                    }}
                    className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all text-sm shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Mark as Resolved
                  </button>
                )}
                {finding.cve && (
                  <a
                    href={`https://nvd.nist.gov/vuln/detail/${finding.cve}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-sm shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    View CVE Details
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-shrink-0 p-2 hover:bg-slate-700/50 rounded-lg transition-all"
        >
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes slide-down {
          from { 
            opacity: 0;
            max-height: 0;
          }
          to { 
            opacity: 1;
            max-height: 1000px;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FindingCard;