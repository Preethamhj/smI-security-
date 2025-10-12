import React, { useState } from "react";
import ScanForm from "../../components/ScanForm";
import FindingCard from "../../components/FindingCard"
 import InternalScanCard from "../../components/internalscan";

// --- Utility Components ---
const LucideIcon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    LayoutGrid: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        ></path>
      </svg>
    ),
    Globe: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 5h20M3 19h20M15 9l-4 4-2-2"
        ></path>
        <circle cx="12" cy="12" r="9"></circle>
      </svg>
    ),
    Lock: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 11V7a4 4 0 118 0v4m-4 5v-4m0 4h.01M5 15h14a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z"
        ></path>
      </svg>
    ),
    Clock: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
    AlertTriangle: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        ></path>
      </svg>
    ),
    User: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
      </svg>
    ),
    Shield: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        ></path>
      </svg>
    ),
    ShieldCheck: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.276a11.002 11.002 0 00-15.226 0l-1.071 1.072M12 21.071l-1.071-1.072m1.071-1.071v-6.929M12 3a9 9 0 00-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 00-9-9z"
        ></path>
      </svg>
    ),
  };
  return icons[name] || <div className={className}>?</div>;
};

const Card = ({ title, children, className = "" }) => (
  <div
    className={`bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl shadow-2xl border border-slate-700/50 ${className}`}
  >
    <h2 className="text-xl font-semibold text-cyan-300 mb-4 border-b border-slate-700 pb-2">
      {title}
    </h2>
    {children}
  </div>
);

const NavItem = ({ id, label, iconName, isActive, onClick }) => (
  <li className="group">
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50"
          : "text-gray-300 hover:bg-slate-700 hover:text-white"
      }`}
    >
      <LucideIcon name={iconName} className="w-6 h-6 shrink-0 md:mr-3" />
      <span className="hidden md:inline font-medium">{label}</span>
    </button>
  </li>
);

const DashboardPage = () => (
  <div className="space-y-8">
    <Card title="System Health & Overview" className="text-center">
      <div className="flex justify-center items-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-30 animate-pulse"></div>
          <LucideIcon
            name="ShieldCheck"
            className="w-32 h-32 text-cyan-400 mx-auto drop-shadow-2xl relative z-10"
          />
        </div>
      </div>

      <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
        The Multi-Layer Security System provides automated scanning, continuous
        monitoring, and risk scoring to protect your Website, Server, and
        Database layers.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-4 border-t border-slate-700">
        <div className="p-4 bg-green-500/10 rounded-lg shadow-lg border-green-400 border-l-4 backdrop-blur-sm">
          <p className="text-sm text-green-400 font-medium">Status</p>
          <p className="text-2xl font-bold text-green-300">Operational</p>
        </div>
        <div className="p-4 bg-red-500/10 rounded-lg shadow-lg border-red-400 border-l-4 backdrop-blur-sm">
          <p className="text-sm text-red-400 font-medium">Critical Findings</p>
          <p className="text-2xl font-bold text-red-300">2</p>
        </div>
        <div className="p-4 bg-blue-500/10 rounded-lg shadow-lg border-blue-400 border-l-4 backdrop-blur-sm">
          <p className="text-sm text-blue-400 font-medium">Assets Monitored</p>
          <p className="text-2xl font-bold text-blue-300">12</p>
        </div>
      </div>
    </Card>

    <Card title="Unique Application Features">
      <ul className="list-disc list-inside ml-4 space-y-3 text-gray-300">
        <li className="font-semibold text-cyan-300">Multi-Layer Protection:</li>
        <p className="ml-4 text-sm text-gray-400">
          Targets Website (Presentation), Server (Application), and Database
          (Data) layers, ensuring comprehensive SME coverage.
        </p>

        <li className="font-semibold mt-2 text-cyan-300">
          Privacy-First Internal Scanning:
        </li>
        <p className="ml-4 text-sm text-gray-400">
          Supports{" "}
          <span className="font-mono text-cyan-400">
            Local-runner signed scripts
          </span>{" "}
          for privacy-respecting ingestion of sanitized internal bundles (Phase
          2).
        </p>

        <li className="font-semibold mt-2 text-cyan-300">
          Human-Friendly Remediation:
        </li>
        <p className="ml-4 text-sm text-gray-400">
          Findings are converted into{" "}
          <span className="font-mono text-cyan-400">
            Simple Remediation Cards
          </span>{" "}
          with clear next steps and difficulty estimates.
        </p>

        <li className="font-semibold mt-2 text-cyan-300">
          Credentialed & Secure Operations:
        </li>
        <p className="ml-4 text-sm text-gray-400">
          Implements Ephemeral Worker Credential Handling and Secure Vault
          Integration for least-privilege authenticated checks (Phase 3).
        </p>
      </ul>
    </Card>
  </div>
);

const ExternalScanPage = () => (
  <div className="space-y-8">
    <Card title="Initiate External (Unauthenticated) Scan">
      <p className="text-gray-300 mb-4">
        This scan performs{" "}
        <span className="font-semibold text-cyan-300">
          Baseline Fingerprinting
        </span>{" "}
        and attack simulation against public-facing assets. Non-intrusive and
        ideal for initial risk assessment.
      </p>
      <ScanForm/>
     
    </Card>
  </div>
);

const InternalScanPage = () => (
  <div className="space-y-8">
   < InternalScanCard/>
   
  </div>
);

const HistoryPage = () => (
  <div className="space-y-6">
    <Card title="Scan History & Job Queue Status">
      <p className="text-gray-300 mb-4">
        Monitor the execution status of the system's Orchestrator and individual
        scan jobs.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                Scan ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                Asset ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                Start Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-800/30 divide-y divide-slate-700">
            <tr className="hover:bg-slate-700/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                SCN-0034
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                ASSET-1234
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                External
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                  Completed
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                2025-10-10 14:30
              </td>
            </tr>
            <tr className="hover:bg-slate-700/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                SCN-0035
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                ASSET-5678
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                Internal
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                  Processing
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                2025-10-11 09:00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const FindingsPage = () => (
  <div className="space-y-6">
    <FindingCard/>
  </div>
);

export default function APP() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showProfile, setShowProfile] = useState(false);
  const userId = "user-demo-1234";

  const handleLogout = () => {
    setShowProfile(false);
    // In your actual app, add: navigate("/login");
    alert("Logged out successfully! In your app, this will redirect to /login page.");
  };

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      iconName: "LayoutGrid",
      component: DashboardPage,
      subtitle: "System Health & Overview",
    },
    {
      id: "external-scan",
      label: "External Scan",
      iconName: "Globe",
      component: ExternalScanPage,
      subtitle: "Unauthenticated Baseline Check",
    },
    {
      id: "internal-scan",
      label: "Internal Scan",
      iconName: "Lock",
      component: InternalScanPage,
      subtitle: "Credentialed & Deep Checks",
    },
    {
      id: "history",
      label: "History",
      iconName: "Clock",
      component: HistoryPage,
      subtitle: "Scan Job Queue",
    },
    {
      id: "findings",
      label: "Findings",
      iconName: "AlertTriangle",
      component: FindingsPage,
      subtitle: "Canonical Schema",
    },
  ];

  const activePage = navItems.find((item) => item.id === currentPage);
  const CurrentPageComponent = activePage ? activePage.component : null;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-0 -left-20"></div>
        <div
          className="absolute w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse bottom-0 -right-20"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      <nav className="w-20 md:w-64 bg-slate-900/80 backdrop-blur-xl flex flex-col text-gray-300 p-3 relative z-10 border-r border-slate-700/50 shadow-2xl">
        <div className="flex items-center p-4 mb-6 border-b border-slate-700">
          <LucideIcon name="Shield" className="w-8 h-8 text-cyan-400 md:mr-3" />
          <span className="hidden md:inline text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            SecureLayers
          </span>
        </div>

        <ul className="space-y-3 flex-1">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              id={item.id}
              label={item.label}
              iconName={item.iconName}
              isActive={currentPage === item.id}
              onClick={setCurrentPage}
            />
          ))}
        </ul>

        <div className="mt-4 pt-4 border-t border-slate-700">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center p-2 text-gray-400 hover:text-white transition-colors duration-150 rounded-lg w-full hover:bg-slate-700"
          >
            <LucideIcon name="User" className="w-6 h-6 md:mr-3" />
            <span className="hidden md:inline text-sm font-medium">
              Profile
            </span>
          </button>
        </div>
      </nav>

      {showProfile && (
        <div className="fixed bottom-4 left-4 md:left-20 w-64 bg-slate-800/95 backdrop-blur-xl border border-cyan-500/30 rounded-lg shadow-2xl p-4 z-50">
          <p className="text-cyan-300 text-sm font-semibold mb-1">User ID:</p>
          <p className="text-xs text-gray-400 mb-3 break-all">{userId}</p>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold shadow-lg shadow-blue-500/50 transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      )}

      <main className="flex-1 p-4 md:p-10 overflow-y-auto relative z-10">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            {activePage.label}
          </h1>
          {activePage.subtitle && (
            <p className="text-cyan-400 font-medium mt-1">
              {activePage.subtitle}
            </p>
          )}
        </header>
        <div className="min-h-[80vh]">
          {CurrentPageComponent && <CurrentPageComponent />}
        </div>
      </main>
    </div>
  );
}