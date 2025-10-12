import React, { useState, useEffect } from 'react';

const ScanStatus = ({ scanId, onComplete }) => {
  const [status, setStatus] = useState('queued');
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('Calculating...');
  const [currentTask, setCurrentTask] = useState('Initializing scan...');

  const tasks = [
    'Resolving target address...',
    'Scanning open ports...',
    'Analyzing SSL/TLS certificates...',
    'Checking for vulnerabilities...',
    'Examining HTTP headers...',
    'Running deep security checks...',
    'Compiling results...',
    'Generating report...'
  ];

  useEffect(() => {
    let interval;
    let taskInterval;
    let taskIndex = 0;

    const simulateScan = () => {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            clearInterval(taskInterval);
            setStatus('completed');
            setCurrentTask('Scan completed!');
            if (onComplete) {
              setTimeout(() => onComplete(), 1000);
            }
            return 100;
          }
          
          const newProgress = prev + Math.random() * 5;
          const remaining = ((100 - newProgress) / 5) * 3;
          const minutes = Math.floor(remaining / 60);
          const seconds = Math.floor(remaining % 60);
          setTimeRemaining(`${minutes}m ${seconds}s`);
          
          if (newProgress > 20 && status === 'queued') {
            setStatus('running');
          }
          
          return Math.min(newProgress, 100);
        });
      }, 1000);

      taskInterval = setInterval(() => {
        taskIndex = (taskIndex + 1) % tasks.length;
        setCurrentTask(tasks[taskIndex]);
      }, 3000);
    };

    simulateScan();

    return () => {
      clearInterval(interval);
      clearInterval(taskInterval);
    };
  }, []);

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

      <div className="w-full max-w-3xl relative z-10">
        <div className="text-center mb-8" style={{animation: 'fadeIn 0.8s ease-out'}}>
          <div className="inline-flex items-center justify-center w-32 h-32 mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-30" style={{animation: 'spinSlow 3s linear infinite'}}></div>
            <svg className="w-20 h-20 text-cyan-400 animate-pulse relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            NETWORK SCAN IN PROGRESS...
          </h1>
          <p className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent animate-pulse">
            {status === 'queued' ? 'QUEUED' : 'RUNNING'}...
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-cyan-500/30" style={{animation: 'slideUp 0.8s ease-out'}}>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-cyan-300 font-semibold text-sm">Target Address</span>
              <span className="text-gray-400 text-sm font-mono">{scanId || '192.168.1.101'}</span>
            </div>
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{width: '100%', animation: 'shimmer 2s linear infinite', backgroundSize: '200% 100%'}}></div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-semibold">{currentTask}</span>
              <span className="text-cyan-400 font-bold text-lg">{Math.round(progress)}% COMPLETE</span>
            </div>
            
            <div className="relative h-8 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{animation: 'slideRight 1.5s ease-in-out infinite'}}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-sm drop-shadow-lg z-10">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-white text-lg mb-6">
            <svg className="w-5 h-5 text-cyan-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Estimated time remaining: <span className="text-cyan-400 font-bold">{timeRemaining}</span></span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <p className="text-white font-semibold capitalize">{status}</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div>
                  <p className="text-xs text-gray-400">Scan ID</p>
                  <p className="text-white font-semibold font-mono text-sm">#{scanId || 'ASDN-1934'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {['Port Scanning', 'SSL Analysis', 'Vulnerability Check', 'Header Inspection'].map((task, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-lg border border-slate-700/50">
                {progress > (idx + 1) * 20 ? (
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : progress > idx * 20 ? (
                  <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                ) : (
                  <div className="w-5 h-5 border-2 border-slate-600 rounded-full flex-shrink-0"></div>
                )}
                <span className={`text-sm ${progress > idx * 20 ? 'text-white' : 'text-gray-500'}`}>
                  {task}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <button className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/50 border-2 border-transparent hover:border-cyan-400">
              VIEW LOGS
            </button>
            <button className="flex-1 py-3 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-all border-2 border-slate-600 hover:border-slate-500">
              CANCEL SCAN
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            Scan running securely with enterprise-grade protection
          </p>
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
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ScanStatus;