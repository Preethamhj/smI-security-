import React from 'react';

// A simple Card component wrapper for styling consistency
const Card = ({ title, children }) => (
  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-2xl backdrop-blur-sm">
    <h2 className="text-2xl font-bold text-cyan-400 mb-4 border-b border-slate-600 pb-2">{title}</h2>
    {children}
  </div>
);

// A simple Modal component to display scan information
const ScanInfoModal = ({ title, description, onClose }) => {
  if (!title) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 p-6 rounded-lg max-w-lg w-full shadow-2xl border border-slate-700">
        <h3 className="text-xl font-bold text-cyan-400 mb-3">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>
        <button 
          onClick={onClose} 
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const InternalScanCard = () => {
  const [modalContent, setModalContent] = React.useState(null);

  const scanModes = {
    CREDENTIALED_SCAN: {
      title: "Credentialed (Vaulted) Scan Details",
      description: 
       "This mode involves customers providing credentials for deeper checks, which are then stored in a secure secrets manager (Vault) with strict ACLs and audit logs[cite: 50, 52, 85]. " +
         "Credentials are used by ephemeral workers in-memory and purged immediately after the job to minimize risk[cite: 51, 84]. " +
         "It provides deep findings in the Server and Database layers[cite: 38, 32].",
      buttonText: "Configure Credential Vault Scan",
    },
    LOCAL_RUNNER_SCAN: {
      title: "Local-Runner (Privacy-First) Scan Details",
      description: 
         "This mode is best for privacy-conscious customers who refuse to share secrets externally[cite: 54]. " +
         "The administrator downloads a signed script and runs it locally on their infrastructure[cite: 14, 53]. " +
         "The script produces a sanitized result bundle which is then uploaded for ingestion[cite: 53]. [cite_start]This approach minimizes external operational burden[cite: 6].",
      buttonText: "Generate Local-Runner Script",
    },
    AGENT_MODE: {
      title: "Agent Mode (Continuous Monitoring)",
      description: 
         "This optional mode uses a lightweight agent that runs continuously on target hosts for ongoing monitoring and scheduled checks[cite: 55]. " +
         "It provides richer telemetry but increases operational complexity (install, update, signing)[cite: 56]. " +
         "This is part of Phase 4 of the suggested MVP plan[cite: 133].",
      buttonText: "Set up Agent Mode",
    }
  };

  const handleButtonClick = (mode) => {
    setModalContent(scanModes[mode]);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-start justify-center p-8">
      <div className="max-w-xl w-full">
        <Card title="Initiate Deep/Internal Scan (Server & Database Layers)">
          <p className="text-gray-300 mb-6">
            To achieve deep visibility beyond the public web interface, the system supports two powerful, authenticated scanning modes: 
            Local-Runner (for privacy) and Credentialed (for convenience and automation). These checks focus on Patch Posture, 
             Access Control, and Database Privileges[cite: 28, 38].
          </p>

          <div className="space-y-4">
            {/* Button 1: Credentialed/Vault Scan */}
            <button
              onClick={() => handleButtonClick('CREDENTIALED_SCAN')}
              className="w-full py-3 px-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all shadow-lg transform hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              {scanModes.CREDENTIALED_SCAN.buttonText}
            </button>

            {/* Button 2: Local-Runner Scan */}
            <button
              onClick={() => handleButtonClick('LOCAL_RUNNER_SCAN')}
              className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-lg transform hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
              {scanModes.LOCAL_RUNNER_SCAN.buttonText}
            </button>
            
            {/* Optional Button 3: Agent Mode (for completeness from PDF) */}
            <button
              onClick={() => handleButtonClick('AGENT_MODE')}
              className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg transform hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
              </svg>
              {scanModes.AGENT_MODE.buttonText}
            </button>
          </div>
        </Card>
      </div>

      <ScanInfoModal
        title={modalContent?.title}
        description={modalContent?.description}
        onClose={() => setModalContent(null)}
      />
    </div>
  );
};

export default InternalScanCard;