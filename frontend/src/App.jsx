import React from 'react'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Landingpage from './pages/auth/landingpage'
import FullPage from './pages/monitoring/dashboard'
import Details from './pages/history/details'
import Alerts from './pages/monitoring/alerts'
import Reports from './pages/normalization/reports'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ScanResult from './pages/normalization/scanresult'
// newscan is implemented under internalscan in this repo; import from there
import NewScan from './pages/scan/internalscan/newscan'
import QueuedJob from './pages/scan/externalscan/queuedjob'

function App() {
  return (
    <Router>
      <div>
     
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/#dashboard" element={<FullPage />} />
          <Route path="/details" element={<Details />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/scanresult" element={<ScanResult />} />
          <Route path="/queuedjob" element={<QueuedJob />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
