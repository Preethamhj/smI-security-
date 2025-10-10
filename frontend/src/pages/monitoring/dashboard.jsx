import React, { useState, useEffect, useCallback } from 'react';


// --- Utility Components ---

const LucideIcon = ({ name, className = "w-5 h-5" }) => {
    // Added 'LayoutGrid' icon for the Dashboard
    const icons = {
        LayoutGrid: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>,
        Globe: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h20M3 19h20M15 9l-4 4-2-2"></path><circle cx="12" cy="12" r="9"></circle></svg>,
        Lock: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0v4m-4 5v-4m0 4h.01M5 15h14a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z"></path></svg>,
        Clock: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
        AlertTriangle: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>,
        ShieldCheck: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.276a11.002 11.002 0 00-15.226 0l-1.071 1.072M12 21.071l-1.071-1.072m1.071-1.071v-6.929M12 3a9 9 0 00-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 00-9-9z"></path></svg>,
        User: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>,
    };
    return icons[name] || <div className={className}>?</div>;
};

const Card = ({ title, children, className = "" }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${className}`}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{title}</h2>
        {children}
    </div>
);

const NavItem = ({ id, label, iconName, isActive, onClick }) => (
    <li className="group">
        <button
            onClick={() => onClick(id)}
            className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
        >
            <LucideIcon name={iconName} className="w-6 h-6 shrink-0 md:mr-3" />
            <span className="hidden md:inline font-medium">{label}</span>
        </button>
    </li>
);

// --- Page Components ---

const DashboardPage = () => (
    <div className="space-y-8">
        <Card title="System Health & Overview" className="text-center">
            {/* Cybersecurity Image (using a large SVG icon for a secure and clean look) */}
            <div className="flex justify-center items-center mb-6">
                <LucideIcon name="ShieldCheck" className="w-32 h-32 text-indigo-500 mx-auto drop-shadow-lg" />
            </div>

            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                The Multi-Layer Security System provides automated scanning, continuous monitoring, and risk scoring to protect your Website, Server, and Database layers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-4 border-t">
                {/* Metrics Cards */}
                <div className="p-4 bg-green-50 rounded-lg shadow-md border-green-300 border-l-4">
                    <p className="text-sm text-green-700 font-medium">Status</p>
                    <p className="text-2xl font-bold text-green-800">Operational</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg shadow-md border-red-300 border-l-4">
                    <p className="text-sm text-red-700 font-medium">Critical Findings</p>
                    <p className="text-2xl font-bold text-red-800">2</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg shadow-md border-blue-300 border-l-4">
                    <p className="text-sm text-blue-700 font-medium">Assets Monitored</p>
                    <p className="text-2xl font-bold text-blue-800">12</p>
                </div>
            </div>
        </Card>

        <Card title="Unique Application Features (Based on Documentation)">
            <ul className="list-disc list-inside ml-4 space-y-3 text-gray-700">
                <li className="font-semibold">Multi-Layer Protection:</li>
                <p className="ml-4 text-sm">Targets Website (Presentation), Server (Application), and Database (Data) layers, ensuring comprehensive SME coverage.</p>
                
                <li className="font-semibold mt-2">Privacy-First Internal Scanning:</li>
                <p className="ml-4 text-sm">Supports <span className="font-mono text-indigo-700">Local-runner signed scripts</span> for privacy-respecting ingestion of sanitized internal bundles (Phase 2).</p>
                
                <li className="font-semibold mt-2">Human-Friendly Remediation:</li>
                <p className="ml-4 text-sm">Findings are converted into <span className="font-mono text-indigo-700">Simple Remediation Cards</span> with clear next steps and difficulty estimates.</p>

                <li className="font-semibold mt-2">Credentialed & Secure Operations:</li>
                <p className="ml-4 text-sm">Implements Ephemeral Worker Credential Handling and Secure Vault Integration for least-privilege authenticated checks (Phase 3).</p>
            </ul>
        </Card>
    </div>
);

const ExternalScanPage = () => (
    <div className="space-y-8">
        <Card title="Initiate External (Unauthenticated) Scan">
            <p className="text-gray-600 mb-4">
                This scan performs <span className="font-semibold">Baseline Fingerprinting</span> and attack simulation against public-facing assets (Website/Presentation Layer). It is non-intrusive and ideal for initial risk assessment (Phase 1 MVP).
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-lg">
                <p className="font-medium">Scope Definition:</p>
                <ul className="list-disc list-inside ml-4 text-sm mt-1">
                    <li>Scan targets: Website domains, public server IPs.</li>
                    <li>Checks include: Open ports, TLS configuration, HTTP headers, visible software versions.</li>
                </ul>
            </div>
            <form className="mt-6 space-y-4">
                <input
                    type="url"
                    placeholder="Enter Domain or Public IP (e.g., example.com)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
                >
                    Start Baseline Scan
                </button>
            </form>
        </Card>
        <Card title="Asset Registration Status">
             <p className="text-gray-600">Ensure your critical assets are registered and tagged with correct **Importance** (Critical/Important/Low) and **Owner Contact** for notifications.</p>
        </Card>
    </div>
);

const InternalScanPage = () => (
    <div className="space-y-8">
        <Card title="Initiate Internal & Credentialed Scan">
            <p className="text-gray-600 mb-4">
                This involves deeper checks on the Server and Database layers. It supports **Local-runner signed scripts** (Phase 2) for privacy and **Ephemeral Worker Credential Handling** (Phase 3) for authenticated checks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-300 rounded-lg">
                    <p className="font-semibold text-green-700">Privacy-First (Phase 2)</p>
                    <p className="text-sm text-gray-700 mt-1">Use local-runner scripts to generate sanitized internal bundles for ingestion. Requires installation on the internal network.</p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                    <p className="font-semibold text-yellow-700">Credentialed One-Time (Phase 3)</p>
                    <p className="text-sm text-gray-700 mt-1">Requires explicit **Permissioning & Consent** and access to the Secure Vault Integration for least-privilege credentials.</p>
                </div>
            </div>
            <button
                className="mt-6 w-full py-3 px-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
            >
                Configure Credential Vault & Target
            </button>
        </Card>
        <Card title="Internal Asset Checklist">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Server IPs or hostnames (Application Layer).</li>
                <li>Database endpoints (Data Layer).</li>
                <li>Ensure the normalizer is configured for internal log output.</li>
            </ul>
        </Card>
    </div>
);

const HistoryPage = () => (
    <div className="space-y-6">
        <Card title="Scan History & Job Queue Status">
            <p className="text-gray-600 mb-4">Monitor the execution status of the system's Orchestrator and individual scan jobs. This provides visibility into the `queueService.js` and `scanWorker.js` backend components.</p>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scan ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SCN-0034</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ASSET-1234</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">External</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-10-10 14:30</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SCN-0035</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ASSET-5678</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Internal</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Processing</span></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-10-11 09:00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
);

const FindingsPage = () => (
    <div className="space-y-6">
        <Card title="Canonical Findings & Remediation">
            <p className="text-gray-600 mb-4">
                View normalized security findings from the <span className="font-semibold">normalizer.js</span> output. Findings are converted to <span className="font-semibold">Simple Remediation Cards</span> for immediate action.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-red-100 text-red-800 rounded-lg shadow-sm">
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm">High Severity</p>
                </div>
                <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow-sm">
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm">Medium Severity</p>
                </div>
                <div className="p-4 bg-blue-100 text-blue-800 rounded-lg shadow-sm">
                    <p className="text-2xl font-bold">18</p>
                    <p className="text-sm">Low/Info Findings</p>
                </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-3">Example Finding:</h3>
            <div className="p-4 border-l-4 border-red-500 bg-gray-50 rounded-lg">
                <p className="text-sm font-bold text-red-600">High: SQL Injection (ASSET-1234)</p>
                <p className="text-xs italic text-gray-500 my-1">Scanner: owasp-zap:2.12.0 | First Seen: 2025-09-16</p>
                <p className="text-gray-700 text-sm mt-2">
                    Blind SQL injection detected in `/order/submit` when submitting special payloads.
                </p>
                <div className="mt-3 p-3 bg-white border rounded-lg">
                    <p className="font-semibold text-sm mb-1">Simple Remediation Card</p>
                    <p className="text-xs">Action: Validate and parameterize database queries. Apply WAF rule to block exploit patterns.</p>
                </div>
            </div>
        </Card>
        <button className="py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
            Generate Exportable Compliance Report (PDF)
        </button>
    </div>
);


// --- Main App Component ---

const APP = () => {
    // 1. Navigation State
    const [currentPage, setCurrentPage] = useState('dashboard'); // Changed default page to Dashboard
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [userId, setUserId] = useState(null);

    // 2. Navigation Definition updated to include Dashboard
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', iconName: 'LayoutGrid', component: DashboardPage, subtitle: 'System Health & Overview' },
        { id: 'external-scan', label: 'External Scan', iconName: 'Globe', component: ExternalScanPage, subtitle: 'Unauthenticated Baseline Check' },
        { id: 'internal-scan', label: 'Internal Scan', iconName: 'Lock', component: InternalScanPage, subtitle: 'Credentialed & Deep Checks' },
        { id: 'history', label: 'History', iconName: 'Clock', component: HistoryPage, subtitle: 'Scan Job Queue' },
        { id: 'findings', label: 'Findings', iconName: 'AlertTriangle', component: FindingsPage, subtitle: 'Canonical Schema' },
    ];
    
    // Find the current page configuration
    const activePage = navItems.find(item => item.id === currentPage);
    const CurrentPageComponent = activePage ? activePage.component : null;


    // 3. Firebase Initialization and Authentication Logic
    useEffect(() => {
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

        if (Object.keys(firebaseConfig).length > 0) {
            try {
                const app = initializeApp(firebaseConfig);
                const auth = getAuth(app);
                // const db = getFirestore(app); // Get Firestore instance if needed later

                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        setUserId(user.uid);
                    } else {
                        // Attempt silent sign-in only if not already authenticated
                        try {
                            if (initialAuthToken) {
                                const cred = await signInWithCustomToken(auth, initialAuthToken);
                                setUserId(cred.user.uid);
                            } else {
                                const anonCred = await signInAnonymously(auth);
                                setUserId(anonCred.user.uid);
                            }
                        } catch (error) {
                            console.error("Auth failed:", error);
                            // Fallback to random ID if auth totally fails
                            setUserId(crypto.randomUUID()); 
                        }
                    }
                    setIsAuthReady(true);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error("Firebase Initialization Error:", error);
                setUserId(crypto.randomUUID());
                setIsAuthReady(true);
            }
        } else {
            console.warn("Firebase config is missing.");
            setUserId(crypto.randomUUID());
            setIsAuthReady(true);
        }
    }, []);

    // 4. Render Logic
    if (!isAuthReady) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="flex items-center space-x-2 text-indigo-600">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Securing Connection...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex antialiased bg-gray-100">
            {/* Sidebar Navigation */}
            <nav className="w-20 md:w-64 bg-gray-900 text-gray-300 flex flex-col transition-all duration-300 p-3 shadow-2xl">
                <div className="flex items-center p-4 mb-6 border-b border-gray-700">
                    <LucideIcon name="ShieldCheck" className="w-8 h-8 text-indigo-400 shrink-0 md:mr-3" />
                    <span className="text-xl font-extrabold hidden md:inline text-white">SecScanner</span>
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

                {/* User/Auth Info */}
                <div className="mt-auto pt-4 border-t border-gray-700">
                    <div className="flex items-center p-2 text-gray-400 hover:text-white transition-colors duration-150 rounded-lg">
                        <LucideIcon name="User" className="w-6 h-6 shrink-0 md:mr-3" />
                        <div className="hidden md:inline-block">
                            <span className="text-xs font-semibold block">User ID:</span>
                            <span className="text-xs break-all opacity-75">{userId || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-10 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        {activePage.label}
                    </h1>
                    {activePage.subtitle && (
                        <p className="text-indigo-600 font-medium mt-1">{activePage.subtitle}</p>
                    )}
                </header>
                <div className="min-h-[80vh]">
                    {CurrentPageComponent && <CurrentPageComponent />}
                </div>
            </main>
        </div>
    );
};

export default APP;
