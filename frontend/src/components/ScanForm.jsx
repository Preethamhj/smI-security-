import React, { useState, useEffect } from 'react';
import { RefreshCw, Zap, Users, Shield, Clock, HardHat, AlertTriangle, ArrowRight, Activity, Calendar } from 'lucide-react';
import { initiateScan } from '../services/external';  

// Define the available primary scan types and their default options for the API payload
const SCAN_TYPES = [
  { 
    key: 'QUICK', 
    label: 'Quick Baseline Scan', 
    description: 'Baseline port and service identification.', 
    icon: Clock,
    defaultOptions: { portList: '1-1024' } 
  },
  { 
    key: 'FULL', 
    label: 'Full Comprehensive Scan', 
    description: 'Comprehensive discovery and deep vulnerability check.', 
    icon: Zap,
    defaultOptions: { vulnerabilityDepth: 'medium' } 
  },
  { 
    key: 'NETWORK', 
    label: 'Advanced Network Scan', 
    description: 'Host discovery, OS fingerprinting, advanced version detection.', 
    icon: Activity,
    defaultOptions: { osDetection: true, portRange: '1-65535' } 
  },
  { 
    key: 'WEB', 
    label: 'Web Application Scan', 
    description: 'Application layer crawling, attack simulation, and misconfiguration checks.', 
    icon: HardHat,
    defaultOptions: { maxDepth: 5, spiderEngine: 'ZAP' } 
  },
  { 
    key: 'SSL', 
    label: 'SSL/TLS Analysis', 
    description: 'Cipher strength and certificate validity.', 
    icon: Shield,
    defaultOptions: { enforceStrongCiphers: true } 
  },
];

const initialFormData = {
  target: '',
  ownerContact: '',
  scheduleType: 'once', // 'once' or 'scheduled'
  scheduleDays: 7, // Default days for scheduled scan
  scanType: 'QUICK', // Now a single string for the primary scan type
  scanOptions: SCAN_TYPES.find(t => t.key === 'QUICK').defaultOptions, // Default options based on initial scanType
};

const ScanForm = () => {
  // State for all form data, consolidated into a single object
  const [formData, setFormData] = useState(initialFormData);
  
  // App logic state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scanResult, setScanResult] = useState(null);

  // Placeholder useEffect hook (to be modified later)
  useEffect(() => {
    // This effect runs whenever the main form data changes
    console.log('Form data updated:', formData);
  }, [formData]);

  const validateInput = (input) => {
    // Regex for domain or IP (IPv4 only for simplicity)
    const domainRegex = /^(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3})$/;
    return domainRegex.test(input);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = value;

    if (name === 'scheduleDays' && type === 'number') {
        newValue = parseInt(value, 10) || 1; // Ensure it's a number and at least 1
    }

    setFormData(prev => ({ 
        ...prev, 
        [name]: newValue 
    }));
  };
  
  // New function to handle selecting a primary scan type
  const selectScanType = (typeKey) => {
    const selectedType = SCAN_TYPES.find(t => t.key === typeKey);
    if (selectedType) {
        setFormData(prev => ({
            ...prev,
            scanType: typeKey,
            scanOptions: selectedType.defaultOptions, // Update scanOptions based on the selected type
        }));
    }
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setScanResult(null);

  // --- Validation ---
  if (!formData.target.trim()) {
    setError('Please enter a target domain or IP address');
    return;
  }
  if (!validateInput(formData.target)) {
    setError('Invalid domain or IP format. Example: example.com or 192.168.1.1');
    return;
  }
  if (!formData.scanType) {
    setError('Please select a scan type.');
    return;
  }
  if (
    formData.scheduleType === 'scheduled' &&
    (!formData.scheduleDays || formData.scheduleDays < 1)
  ) {
    setError('Please enter a valid number of days (1 or more) for the scheduled scan.');
    return;
  }

  setLoading(true);

  // --- Construct API Payload ---
  const payload = {
    target: formData.target,
    scanType: formData.scanType,
    scanOptions: formData.scanOptions,
  };

  console.log('API Payload to be sent:', payload); // Debugging the final payload structure

  try {
    // Actual API call (not mock)
    const response = await initiateScan(payload);

    // Check for response validity
    if (!response || response.error) {
      throw new Error(response?.error || 'Unknown API error');
    }

    // Assuming the API returns a scan job or result object
    setScanResult(response);
  } catch (err) {
    console.error('Scan initiation error:', err);
    setError('Failed to initiate scan job. Please check connectivity.');
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Orbs and Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-0 -left-20"></div>
        <div className="absolute w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse bottom-0 -right-20" style={{animationDelay: '2s'}}></div>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="w-full max-w-2xl relative z-10" style={{animation: 'fadeIn 0.8s ease-out'}}>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-2xl shadow-blue-500/50" style={{animation: 'float 3s ease-in-out infinite'}}>
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-2">
            Asset Registration & Security Scan
          </h1>
          <p className="text-gray-400">Configure scan parameters and register the asset details below</p>
        </div>

        {/* Scan Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700/50" style={{animation: 'slideUp 0.8s ease-out'}}>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Target Input */}
            <div>
              <label htmlFor="target" className="text-cyan-300 text-sm font-semibold block mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Target Domain or IP Address
              </label>
              <div className="relative group">
                <input
                  id="target"
                  name="target"
                  type="text"
                  value={formData.target}
                  onChange={handleChange}
                  placeholder="example.com or 192.168.1.1"
                  className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all pr-12"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Owner Contact Input */}
            <div>
              <label htmlFor="ownerContact" className="text-cyan-300 text-sm font-semibold block mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Asset Owner Contact (Optional)
              </label>
              <input
                id="ownerContact"
                name="ownerContact"
                type="text"
                value={formData.ownerContact}
                onChange={handleChange}
                placeholder="security.owner@example.com"
                className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            {/* Scan Type Selection (New: Single Select) */}
            <div>
              <label className="text-cyan-300 text-sm font-semibold block mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Select Scan Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SCAN_TYPES.map(type => {
                    const isSelected = formData.scanType === type.key;
                    const TypeIcon = type.icon;

                    return (
                        <button
                            key={type.key}
                            type="button"
                            onClick={() => selectScanType(type.key)}
                            disabled={loading}
                            className={`p-3 rounded-lg border-2 text-left transition-all duration-300 disabled:opacity-50 ${
                                isSelected
                                ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                                : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                            }`}
                        >
                            <div className="flex items-start gap-2">
                                <TypeIcon className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-cyan-400' : 'text-gray-400'}`} />
                                <div>
                                    <p className={`font-semibold text-sm ${isSelected ? 'text-cyan-300' : 'text-gray-400'}`}>{type.label}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{type.description}</p>
                                </div>
                            </div>
                        </button>
                    );
                })}
              </div>
            </div>
            
            {/* Scan Schedule (Once or Scheduled with days input) */}
            <div>
              <label className="text-cyan-300 text-sm font-semibold block mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Scan Schedule
              </label>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* One-Time Scan Button */}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, scheduleType: 'once' }))}
                  disabled={loading}
                  className={`p-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 ${
                    formData.scheduleType === 'once'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-slate-900/50 text-gray-400 hover:bg-slate-700/70 border border-slate-700'
                  }`}
                >
                  <Clock className="w-4 h-4" /> One-Time Scan
                </button>

                {/* Scheduled Scan Button */}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, scheduleType: 'scheduled' }))}
                  disabled={loading}
                  className={`p-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 ${
                    formData.scheduleType === 'scheduled'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-slate-900/50 text-gray-400 hover:bg-slate-700/70 border border-slate-700'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" /> Scheduled Recurrence
                </button>
              </div>

              {/* Conditional Input for Scheduled Days */}
              {formData.scheduleType === 'scheduled' && (
                  <div className="mt-4">
                    <label htmlFor="scheduleDays" className="text-gray-400 text-sm font-medium block mb-2">
                        Repeat scan after (days):
                    </label>
                    <input
                        id="scheduleDays"
                        name="scheduleDays"
                        type="number"
                        min="1"
                        value={formData.scheduleDays}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        disabled={loading}
                    />
                  </div>
              )}
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3" style={{animation: 'shake 0.3s ease-in-out'}}>
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-105 transition-all shadow-lg shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <RefreshCw className="animate-spin h-5 w-5" />
                  Initiating Scan Job...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  Start Security Scan
                </span>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Shield className="w-4 h-4" />
              All scans are performed securely and ethically.
            </div>
          </form>
        </div>
        
        {/* Results Display */}
        {scanResult && (
          <div className="mt-8 bg-green-800/30 backdrop-blur-xl rounded-xl p-6 border border-green-700/50 shadow-2xl shadow-green-500/20">
            <h3 className="text-green-300 font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 animate-pulse" />
              Scan Job Initiated Successfully!
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
              <p><span className="text-green-400 font-medium">Job ID:</span> {scanResult.jobId}</p>
              <p><span className="text-green-400 font-medium">Target:</span> {scanResult.target}</p>
              <p><span className="text-green-400 font-medium">Scan Type:</span> {scanResult.scanType}</p>
              <p><span className="text-green-400 font-medium">Schedule:</span> {scanResult.scheduleType === 'once' ? 'One-Time' : `Every ${scanResult.scheduleDays} days`}</p>
              <p><span className="text-green-400 font-medium">Contact:</span> {scanResult.ownerContact || 'N/A'}</p>
              <p className="col-span-2"><span className="text-green-400 font-medium">API Options:</span> 
                  <code className="bg-slate-700/50 p-1 rounded text-xs ml-2">{JSON.stringify(scanResult.apiPayload.scanOptions)}</code>
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-4">The security assessment is now queued. Results will be available in your dashboard shortly.</p>
          </div>
        )}

      </div>

      <style jsx="true">{`
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
