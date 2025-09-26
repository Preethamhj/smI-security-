import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Server, 
  Database, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Users,
  DollarSign,
  Brain,
  Zap,
  Target,
  Award,
  Eye,
  Activity,
  BarChart3,
  PieChart,
  Settings,
  Bell,
  Search,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  Play,
  Pause,
  RefreshCw,
  MessageSquare,
  Bot,
  Cloud,
  Lock,
  Unlock,
  Wifi,
  WifiOff,
  ChevronRight,
  ChevronDown,
  Star,
  Trophy,
  Terminal,
  Code,
  Skull,
  Bug,
  ShieldAlert,
  Radar
} from 'lucide-react';

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [expandedAsset, setExpandedAsset] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: "🔒 SECURITY NEXUS ONLINE. Query your digital fortress status..." }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [scanningEffect, setScanningEffect] = useState(false);

  // Mock data
  const riskScores = {
    web: { score: 72, trend: 'up', change: '+5', status: 'COMPROMISED' },
    server: { score: 85, trend: 'down', change: '-3', status: 'SECURED' },
    database: { score: 91, trend: 'stable', change: '0', status: 'FORTRESS' }
  };

  const assets = [
    { id: 1, name: 'Web Fortress', type: 'web', status: 'breach', risk: 'critical', lastScan: '2 min ago', findings: 13, threat: 'SQL_INJECT' },
    { id: 2, name: 'API Gateway', type: 'server', status: 'warning', risk: 'high', lastScan: '5 min ago', findings: 7, threat: 'DDOS_RISK' },
    { id: 3, name: 'Data Vault', type: 'database', status: 'secured', risk: 'low', lastScan: '1 min ago', findings: 2, threat: 'ENCRYPTED' },
    { id: 4, name: 'Payment Core', type: 'server', status: 'monitoring', risk: 'medium', lastScan: '3 min ago', findings: 5, threat: 'SCANNING' },
  ];

  const criticalThreats = [
    { id: 1, title: 'CRITICAL: SQL INJECTION DETECTED', severity: 'critical', asset: 'Data Vault', cvss: 9.8, age: '12 min ago', type: 'ACTIVE_BREACH' },
    { id: 2, title: 'HIGH: UNPATCHED ZERO-DAY', severity: 'high', asset: 'API Gateway', cvss: 8.4, age: '1 hour ago', type: 'VULNERABILITY' },
    { id: 3, title: 'MEDIUM: WEAK CIPHER DETECTED', severity: 'medium', asset: 'Web Fortress', cvss: 6.7, age: '3 hours ago', type: 'CONFIG_ERROR' },
    { id: 4, title: 'HIGH: SUSPICIOUS TRAFFIC PATTERN', severity: 'high', asset: 'Payment Core', cvss: 7.9, age: '45 min ago', type: 'ANOMALY' }
  ];

  const complianceStatus = {
    sox: { status: 'breach', score: 45, threat: 'AUDIT_FAIL' },
    gdpr: { status: 'warning', score: 78, threat: 'DATA_LEAK' },
    pci: { status: 'secure', score: 92, threat: 'COMPLIANT' },
    iso27001: { status: 'critical', score: 35, threat: 'VIOLATION' }
  };

  const hackingStats = {
    activeThreats: 47,
    blockedAttacks: 1247,
    vulnerabilities: 23,
    securityScore: 7.2
  };

  const gameificationData = {
    totalPoints: 2847,
    level: 8,
    nextLevelPoints: 3500,
    rank: 'CYBER_GUARDIAN',
    badges: ['Threat Hunter', 'Breach Stopper', 'Code Warrior'],
    leaderboard: [
      { name: 'RED TEAM', points: 3890, rank: 1, status: 'ELITE' },
      { name: 'YOUR SQUAD', points: 2847, rank: 2, status: 'GUARDIAN' },
      { name: 'BLUE TEAM', points: 1980, rank: 3, status: 'DEFENDER' }
    ]
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setScanningEffect(true);
        setTimeout(() => setScanningEffect(false), 2000);
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, 
        { type: 'user', message: chatInput },
        { type: 'bot', message: `🚨 THREAT ANALYSIS: "${chatInput}" - CRITICAL SQL injection in Data Vault poses IMMEDIATE risk. Breach probability: 94%. Deploy countermeasures NOW!` }
      ]);
      setChatInput('');
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'secured': return <Shield className="w-5 h-5 text-green-400" />;
      case 'warning': return <ShieldAlert className="w-5 h-5 text-yellow-400" />;
      case 'breach': return <Skull className="w-5 h-5 text-red-400" />;
      case 'monitoring': return <Radar className="w-5 h-5 text-blue-400 animate-pulse" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return 'text-green-400 bg-green-900/30 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/30';
      case 'high': return 'text-orange-400 bg-orange-900/30 border-orange-500/30';
      case 'critical': return 'text-red-400 bg-red-900/30 border-red-500/30 animate-pulse';
      default: return 'text-gray-400 bg-gray-800/30 border-gray-600/30';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'text-red-300 bg-red-900/50 border border-red-500/50';
      case 'high': return 'text-orange-300 bg-orange-900/50 border border-orange-500/50';
      case 'medium': return 'text-yellow-300 bg-yellow-900/50 border border-yellow-500/50';
      case 'low': return 'text-green-300 bg-green-900/50 border border-green-500/50';
      default: return 'text-gray-300 bg-gray-800/50 border border-gray-600/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Matrix-like background effect */}
      <div className="fixed inset-0 opacity-10">
       <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22%2300ff00%22%20fill-opacity=%220.1%22%3E%3Cpath%20d=%22M20%200v40M0%2020h40%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
</div>
      {/* Header */}
      <header className="relative bg-black/40 backdrop-blur-lg border-b border-cyan-500/30 shadow-lg shadow-cyan-500/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Shield className="w-10 h-10 text-cyan-400" />
                <div className="absolute inset-0 w-10 h-10 border-2 border-cyan-400 rounded-full animate-ping opacity-30"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  CYBER NEXUS
                </h1>
                <div className="text-xs text-cyan-300 font-mono">SECURITY COMMAND CENTER</div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-xs text-gray-400 font-mono">THREAT LEVEL</div>
                <div className="text-lg font-bold text-red-400 animate-pulse">CRITICAL</div>
              </div>
              <button 
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-mono border transition-all ${
                  autoRefresh 
                    ? 'bg-green-900/30 text-green-400 border-green-500/50 shadow-green-500/20' 
                    : 'bg-gray-800/50 text-gray-400 border-gray-600/50'
                } shadow-lg`}
              >
                {autoRefresh ? <Radar className="w-4 h-4 animate-spin" /> : <Pause className="w-4 h-4" />}
                <span>{autoRefresh ? 'SCANNING' : 'PAUSED'}</span>
              </button>
              <Bell className="w-6 h-6 text-yellow-400 cursor-pointer hover:text-yellow-300 animate-pulse" />
              <Settings className="w-6 h-6 text-cyan-400 cursor-pointer hover:text-cyan-300" />
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="mt-6 flex space-x-8">
            {[
              { key: 'overview', label: 'OVERVIEW', icon: Eye },
              { key: 'assets', label: 'ASSETS', icon: Server },
              { key: 'threats', label: 'THREATS', icon: Bug },
              { key: 'intel', label: 'INTEL', icon: Brain },
              { key: 'warfare', label: 'WARFARE', icon: Target }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-2 text-sm font-bold font-mono border-b-2 transition-all flex items-center space-x-2 ${
                    activeTab === tab.key 
                      ? 'text-cyan-400 border-cyan-400 shadow-cyan-400/20' 
                      : 'text-gray-400 border-transparent hover:text-cyan-300 hover:border-cyan-300/50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-6 py-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Threat Matrix */}
            <div className="lg:col-span-2 bg-black/40 backdrop-blur-lg rounded-xl border border-cyan-500/30 shadow-xl shadow-cyan-500/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-cyan-400 font-mono flex items-center space-x-2">
                  <Terminal className="w-6 h-6" />
                  <span>SECURITY MATRIX</span>
                </h2>
                {scanningEffect && (
                  <div className="text-xs text-green-400 font-mono animate-pulse">SCANNING...</div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-6">
                {Object.entries(riskScores).map(([layer, data]) => (
                  <div key={layer} className="text-center relative group">
                    <div className="mb-4 relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-lg group-hover:blur-xl transition-all"></div>
                      {layer === 'web' && <Globe className="w-16 h-16 text-cyan-400 mx-auto relative z-10" />}
                      {layer === 'server' && <Server className="w-16 h-16 text-green-400 mx-auto relative z-10" />}
                      {layer === 'database' && <Database className="w-16 h-16 text-purple-400 mx-auto relative z-10" />}
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase font-mono mb-2">{layer}</h3>
                    <div className="text-4xl font-bold text-white mb-2 font-mono">{data.score}</div>
                    <div className="text-xs font-mono text-gray-400 mb-2">{data.status}</div>
                    <div className={`flex items-center justify-center space-x-1 text-sm font-mono ${
                      data.trend === 'up' ? 'text-red-400' : data.trend === 'down' ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {data.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                      {data.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                      {data.trend === 'stable' && <Minus className="w-4 h-4" />}
                      <span>{data.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Cyber Assistant */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-green-500/30 shadow-xl shadow-green-500/10 p-6">
              <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center font-mono">
                <Bot className="w-5 h-5 text-green-400 mr-2 animate-pulse" />
                CYBER.AI
              </h3>
              <div className="h-64 overflow-y-auto mb-4 space-y-3 font-mono text-sm">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg border ${
                      msg.type === 'user' 
                        ? 'bg-blue-900/50 text-blue-100 border-blue-500/50' 
                        : 'bg-green-900/30 text-green-300 border-green-500/30'
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="> Query security status..."
                  className="flex-1 px-3 py-2 bg-black/50 border border-green-500/30 rounded-lg text-sm text-green-300 placeholder-green-600 font-mono focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit(e)}
                />
                <button 
                  onClick={handleChatSubmit} 
                  className="px-4 py-2 bg-green-900/50 text-green-400 rounded-lg text-sm font-mono border border-green-500/50 hover:bg-green-800/50 transition-all"
                >
                  EXEC
                </button>
              </div>
            </div>

            {/* Asset Status Grid */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/30 shadow-xl shadow-purple-500/10 p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center font-mono">
                <Activity className="w-5 h-5 mr-2" />
                ASSET STATUS
              </h3>
              <div className="space-y-4">
                {assets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(asset.status)}
                      <div>
                        <div className="font-bold text-white font-mono text-sm">{asset.name}</div>
                        <div className="text-xs text-gray-400 font-mono">{asset.threat}</div>
                        <div className="text-xs text-gray-500 font-mono">{asset.lastScan}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs font-bold rounded-lg font-mono border ${getRiskColor(asset.risk)}`}>
                        {asset.risk.toUpperCase()}
                      </span>
                      <div className="text-xs text-gray-400 font-mono mt-1">{asset.findings} threats</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hacking Stats */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-red-500/30 shadow-xl shadow-red-500/10 p-6">
              <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center font-mono">
                <Skull className="w-5 h-5 mr-2 animate-pulse" />
                THREAT INTEL
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                  <div className="text-2xl font-bold text-red-400 font-mono">{hackingStats.activeThreats}</div>
                  <div className="text-xs text-red-300 font-mono">ACTIVE THREATS</div>
                </div>
                <div className="text-center p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <div className="text-2xl font-bold text-green-400 font-mono">{hackingStats.blockedAttacks}</div>
                  <div className="text-xs text-green-300 font-mono">BLOCKED</div>
                </div>
                <div className="text-center p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                  <div className="text-2xl font-bold text-yellow-400 font-mono">{hackingStats.vulnerabilities}</div>
                  <div className="text-xs text-yellow-300 font-mono">VULNS</div>
                </div>
                <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="text-2xl font-bold text-blue-400 font-mono">{hackingStats.securityScore}</div>
                  <div className="text-xs text-blue-300 font-mono">SEC SCORE</div>
                </div>
              </div>
            </div>

            {/* Compliance Matrix */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-orange-500/30 shadow-xl shadow-orange-500/10 p-6">
              <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center font-mono">
                <Lock className="w-5 h-5 mr-2" />
                COMPLIANCE MATRIX
              </h3>
              <div className="space-y-4">
                {Object.entries(complianceStatus).map(([framework, data]) => (
                  <div key={framework} className="flex items-center justify-between p-2 bg-gray-900/30 rounded border border-gray-700/50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        data.status === 'secure' ? 'bg-green-500' :
                        data.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'
                      }`}></div>
                      <span className="font-bold text-white uppercase font-mono text-sm">{framework}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-white font-mono">{data.score}%</span>
                      <div className="text-xs font-mono text-gray-400">{data.threat}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'threats' && (
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-red-500/30 shadow-xl shadow-red-500/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-red-400 flex items-center font-mono">
                  <Bug className="w-6 h-6 mr-2 animate-pulse" />
                  ACTIVE THREATS
                </h2>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-900/50 text-red-400 rounded-lg text-sm font-mono border border-red-500/50 hover:bg-red-800/50">
                    <Radar className="w-4 h-4 animate-spin" />
                    <span>DEEP SCAN</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-cyan-400 uppercase font-mono">THREAT</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-cyan-400 uppercase font-mono">SEVERITY</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-cyan-400 uppercase font-mono">TARGET</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-cyan-400 uppercase font-mono">CVSS</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-cyan-400 uppercase font-mono">STATUS</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-cyan-400 uppercase font-mono">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {criticalThreats.map((threat) => (
                      <tr key={threat.id} className="hover:bg-gray-900/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-white font-mono">{threat.title}</div>
                          <div className="text-xs text-gray-400 font-mono">{threat.type}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-bold rounded-lg font-mono ${getSeverityColor(threat.severity)}`}>
                            {threat.severity.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-cyan-300 font-mono">{threat.asset}</td>
                        <td className="px-6 py-4 text-sm font-bold text-red-400 font-mono">{threat.cvss}</td>
                        <td className="px-6 py-4 text-sm text-gray-400 font-mono">{threat.age}</td>
                        <td className="px-6 py-4">
                          <button className="text-green-400 hover:text-green-300 text-sm font-bold font-mono border border-green-500/50 px-3 py-1 rounded hover:bg-green-900/30">
                            NEUTRALIZE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'warfare' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-yellow-500/30 shadow-xl shadow-yellow-500/10 p-6">
              <h2 className="text-xl font-bold text-yellow-400 mb-6 flex items-center font-mono">
                <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
                CYBER WARFARE STATS
              </h2>
              
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-cyan-400 mb-2 font-mono">{gameificationData.totalPoints}</div>
                <div className="text-gray-300 font-mono">WARFARE POINTS</div>
                <div className="mt-4">
                  <div className="text-lg font-bold text-yellow-400 font-mono">RANK: {gameificationData.rank}</div>
                  <div className="text-lg font-bold text-white font-mono">LEVEL {gameificationData.level}</div>
                  <div className="w-full bg-gray-700 rounded-full h-4 mt-3 border border-cyan-500/30">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full transition-all duration-1000" 
                      style={{ width: `${(gameificationData.totalPoints / gameificationData.nextLevelPoints) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-400 mt-2 font-mono">
                    {gameificationData.nextLevelPoints - gameificationData.totalPoints} pts to ELITE STATUS
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 text-green-400 font-mono">COMBAT BADGES</h3>
                <div className="grid grid-cols-1 gap-4">
                  {gameificationData.badges.map((badge, idx) => (
                    <div key={idx} className="flex items-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                      <Award className="w-8 h-8 text-yellow-400 mr-3" />
                      <div className="text-sm font-bold text-white font-mono">{badge}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/30 shadow-xl shadow-purple-500/10 p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-6 font-mono">SQUAD RANKINGS</h3>
              <div className="space-y-4">
                {gameificationData.leaderboard.map((team, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                    team.name === 'YOUR SQUAD' 
                      ? 'bg-cyan-900/30 border-cyan-500/50 shadow-cyan-500/20' 
                      : 'bg-gray-900/30 border-gray-700/50'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold font-mono border-2 ${
                        idx === 0 ? 'bg-yellow-500/20 border-yellow-400 text-yellow-400' : 
                        idx === 1 ? 'bg-gray-500/20 border-gray-400 text-gray-300' : 
                        'bg-orange-500/20 border-orange-400 text-orange-400'
                      }`}>
                        #{team.rank}
                      </div>
                      <div>
                        <div className="font-bold text-white font-mono">{team.name}</div>
                        <div className="text-sm text-gray-400 font-mono">{team.status}</div>
                        <div className="text-sm text-cyan-300 font-mono">{team.points} pts</div>
                      </div>
                    </div>
                    {idx === 0 && (
                      <div className="flex items-center space-x-2">
                        <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                        <div className="text-xs text-yellow-400 font-mono font-bold">CHAMPION</div>
                      </div>
                    )}
                    {team.name === 'YOUR SQUAD' && (
                      <div className="text-xs text-cyan-400 font-mono font-bold animate-pulse">ACTIVE</div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <h4 className="text-sm font-bold text-purple-400 mb-2 font-mono">ACTIVE MISSION</h4>
                <div className="text-sm text-white font-mono mb-2">Neutralize 10 Critical Threats</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <div className="text-xs text-gray-400 mt-1 font-mono">Progress: 7/10 threats eliminated</div>
              </div>
            </div>

            {/* Cyber Warfare Command Center */}
            <div className="lg:col-span-2 bg-black/40 backdrop-blur-lg rounded-xl border border-red-500/30 shadow-xl shadow-red-500/10 p-6">
              <h3 className="text-lg font-bold text-red-400 mb-6 flex items-center font-mono">
                <Target className="w-5 h-5 mr-2 animate-pulse" />
                CYBER WARFARE COMMAND
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-red-400 font-mono text-sm">OFFENSIVE OPS</h4>
                    <Zap className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Penetration Tests:</span>
                      <span className="text-red-400">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Exploits Found:</span>
                      <span className="text-red-400">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Systems Breached:</span>
                      <span className="text-red-400">12</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-blue-400 font-mono text-sm">DEFENSIVE OPS</h4>
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Attacks Blocked:</span>
                      <span className="text-blue-400">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Patches Applied:</span>
                      <span className="text-blue-400">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Threats Mitigated:</span>
                      <span className="text-blue-400">156</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-green-400 font-mono text-sm">INTEL OPS</h4>
                    <Eye className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Threats Detected:</span>
                      <span className="text-green-400">2,891</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">IOCs Collected:</span>
                      <span className="text-green-400">445</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Intel Reports:</span>
                      <span className="text-green-400">67</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                  <h4 className="font-bold text-yellow-400 mb-3 font-mono text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    RECENT VICTORIES
                  </h4>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="text-green-400">✓ Neutralized SQL injection attack on Data Vault</div>
                    <div className="text-green-400">✓ Blocked 47 DDoS attempts on API Gateway</div>
                    <div className="text-green-400">✓ Patched critical OpenSSL vulnerability</div>
                    <div className="text-green-400">✓ Enhanced firewall rules deployment</div>
                  </div>
                </div>

                <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                  <h4 className="font-bold text-purple-400 mb-3 font-mono text-sm flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    ACTIVE MISSIONS
                  </h4>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="text-orange-400">⚡ Hunt advanced persistent threats</div>
                    <div className="text-red-400">🔥 Investigate suspicious network traffic</div>
                    <div className="text-yellow-400">⚠️ Update security protocols</div>
                    <div className="text-blue-400">🛡️ Strengthen perimeter defenses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'intel' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/30 shadow-xl shadow-purple-500/10 p-6">
              <h2 className="text-xl font-bold text-purple-400 mb-6 flex items-center font-mono">
                <Brain className="w-6 h-6 text-purple-600 mr-2 animate-pulse" />
                AI THREAT INTELLIGENCE
              </h2>
              <div className="space-y-6">
                <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                  <h4 className="font-bold text-purple-300 mb-2 font-mono text-sm">PREDICTIVE ANALYSIS</h4>
                  <p className="text-sm text-purple-200 font-mono leading-relaxed">
                    🚨 ALERT: 94% probability of ransomware attack targeting Payment Core within 72 hours. 
                    Attack vector: Unpatched vulnerability in payment processing module.
                  </p>
                  <div className="mt-2 text-xs text-purple-400 font-mono">CONFIDENCE: HIGH | ACTION REQUIRED</div>
                </div>
                
                <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                  <h4 className="font-bold text-red-300 mb-2 font-mono text-sm">ATTACK CHAIN ANALYSIS</h4>
                  <p className="text-sm text-red-200 font-mono leading-relaxed">
                    🎯 CRITICAL PATH: Web Fortress → API Gateway → Data Vault. 
                    Securing API Gateway breaks chain, reduces overall breach risk by 78%.
                  </p>
                  <div className="mt-2 text-xs text-red-400 font-mono">PRIORITY: MAXIMUM</div>
                </div>
                
                <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                  <h4 className="font-bold text-green-300 mb-2 font-mono text-sm">OPTIMIZATION PROTOCOL</h4>
                  <p className="text-sm text-green-200 font-mono leading-relaxed">
                    💡 RECOMMENDATION: Deploy quantum-resistant encryption on critical assets. 
                    Cost: $45K | Risk Reduction: 89% | ROI: 340%
                  </p>
                  <div className="mt-2 text-xs text-green-400 font-mono">STATUS: APPROVED FOR DEPLOYMENT</div>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-cyan-500/30 shadow-xl shadow-cyan-500/10 p-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-6 flex items-center font-mono">
                <Cloud className="w-5 h-5 text-cyan-600 mr-2" />
                GLOBAL THREAT MATRIX
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                  <div>
                    <div className="font-bold text-red-300 font-mono text-sm">INDUSTRY ALERT: CRITICAL</div>
                    <div className="text-sm text-red-200 font-mono">Zero-day exploits targeting fintech increased 890%</div>
                    <div className="text-xs text-red-400 font-mono mt-1">Source: Dark Web Intel</div>
                  </div>
                  <Skull className="w-8 h-8 text-red-400 animate-pulse" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                  <div>
                    <div className="font-bold text-yellow-300 font-mono text-sm">GEOGRAPHIC RISK: HIGH</div>
                    <div className="text-sm text-yellow-200 font-mono">State-sponsored attacks from hostile nations</div>
                    <div className="text-xs text-yellow-400 font-mono mt-1">Threat Level: DEFCON 2</div>
                  </div>
                  <Target className="w-8 h-8 text-yellow-400" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div>
                    <div className="font-bold text-blue-300 font-mono text-sm">TEMPORAL ANALYSIS</div>
                    <div className="text-sm text-blue-200 font-mono">Holiday season attack patterns detected</div>
                    <div className="text-xs text-blue-400 font-mono mt-1">Peak Risk: Dec 15-Jan 5</div>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-400" />
                </div>

                <div className="flex items-center justify-between p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                  <div>
                    <div className="font-bold text-green-300 font-mono text-sm">DEFENSIVE POSTURE</div>
                    <div className="text-sm text-green-200 font-mono">AI-powered threat hunting active</div>
                    <div className="text-xs text-green-400 font-mono mt-1">Coverage: 97.3%</div>
                  </div>
                  <Radar className="w-8 h-8 text-green-400 animate-spin" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
                <h4 className="font-bold text-cyan-300 mb-3 font-mono text-sm">QUANTUM THREAT ASSESSMENT</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-mono">
                    <span className="text-gray-300">Quantum Readiness:</span>
                    <span className="text-cyan-400">23%</span>
                  </div>
                  <div className="flex justify-between text-sm font-mono">
                    <span className="text-gray-300">Crypto Migration:</span>
                    <span className="text-yellow-400">IN PROGRESS</span>
                  </div>
                  <div className="flex justify-between text-sm font-mono">
                    <span className="text-gray-300">Risk Window:</span>
                    <span className="text-red-400">8-12 YEARS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-green-500/30 shadow-xl shadow-green-500/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-green-400 flex items-center font-mono">
                  <Server className="w-6 h-6 mr-2" />
                  DIGITAL ASSET REGISTRY
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-mono text-gray-400">
                    Last Scan: <span className="text-green-400">32 seconds ago</span>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-900/50 text-green-400 rounded-lg text-sm font-mono border border-green-500/50">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>SCANNING</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {assets.map((asset) => (
                  <div 
                    key={asset.id} 
                    className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      asset.status === 'breach' ? 'bg-red-900/20 border-red-500/50 shadow-red-500/20' :
                      asset.status === 'warning' ? 'bg-yellow-900/20 border-yellow-500/50 shadow-yellow-500/20' :
                      asset.status === 'secured' ? 'bg-green-900/20 border-green-500/50 shadow-green-500/20' :
                      'bg-blue-900/20 border-blue-500/50 shadow-blue-500/20'
                    }`}
                    onClick={() => setExpandedAsset(expandedAsset === asset.id ? null : asset.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(asset.status)}
                        <div>
                          <h3 className="text-lg font-bold text-white font-mono">{asset.name}</h3>
                          <div className="text-sm text-gray-400 font-mono">{asset.type.toUpperCase()} SYSTEM</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 text-sm font-bold rounded-lg font-mono border ${getRiskColor(asset.risk)}`}>
                          {asset.risk.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-2xl font-bold text-white font-mono">{asset.findings}</div>
                        <div className="text-xs text-gray-400 font-mono">THREATS</div>
                      </div>
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-lg font-bold text-cyan-400 font-mono">{asset.lastScan}</div>
                        <div className="text-xs text-gray-400 font-mono">LAST SCAN</div>
                      </div>
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-lg font-bold text-purple-400 font-mono">{asset.threat}</div>
                        <div className="text-xs text-gray-400 font-mono">STATUS</div>
                      </div>
                    </div>

                    {expandedAsset === asset.id && (
                      <div className="mt-4 p-4 bg-black/50 rounded-lg border border-gray-700/50">
                        <h4 className="font-bold text-cyan-400 mb-3 font-mono text-sm">DETAILED ANALYSIS</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                          <div>
                            <div className="text-gray-400">Asset ID:</div>
                            <div className="text-white">SYS-{asset.id.toString().padStart(4, '0')}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Security Level:</div>
                            <div className="text-green-400">LEVEL-{Math.floor(Math.random() * 5) + 1}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Encryption:</div>
                            <div className="text-blue-400">AES-256-GCM</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Firewall:</div>
                            <div className="text-green-400">ACTIVE</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 mt-4">
                          <button className="px-4 py-2 bg-green-900/50 text-green-400 rounded font-mono text-sm border border-green-500/50">
                            FORTIFY
                          </button>
                          <button className="px-4 py-2 bg-blue-900/50 text-blue-400 rounded font-mono text-sm border border-blue-500/50">
                            DEEP SCAN
                          </button>
                          <button className="px-4 py-2 bg-red-900/50 text-red-400 rounded font-mono text-sm border border-red-500/50">
                            QUARANTINE
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;