import React from 'react'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Landingpage from './pages/auth/landingpage'
import Dashboard from './pages/monitoring/dashboard'
import Details from './pages/history/details'
import Alerts from './pages/monitoring/alerts'
import Reports from './pages/normalization/reports'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ScanResult from './pages/normalization/scanresult'
import NewScan from './pages/scan/externalscan/newscan'
import QueuedJob from './pages/scan/externalscan/queuedjob'

function App() {
  return (
    <Router>
      <div>
     
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/details" element={<Details />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/scanresult" element={<ScanResult />} />
          <Route path="/newscan" element={<NewScan />} />
          <Route path="/queuedjob" element={<QueuedJob />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
