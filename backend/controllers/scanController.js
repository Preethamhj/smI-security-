const scannerService = require('../services/scannerService');
const Scan = require('../models/Scan');

exports.createScan = async (req, res) => {
  try {
    const { target, scanType } = req.body;

    // Validate input
    if (!target) {
      return res.status(400).json({ error: 'Target is required' });
    }

    // DNS resolution (your existing code)
    const dns = require('dns').promises;
    let resolvedIp = target;

    if (!this.isValidIP(target)) {
      try {
        const addresses = await dns.resolve4(target);
        resolvedIp = addresses[0];
      } catch (dnsError) {
        return res.status(400).json({ 
          error: 'Failed to resolve domain',
          details: dnsError.message 
        });
      }
    }

    // Create scan record
    const scan = await Scan.create({
      target: target,
      resolvedIp: resolvedIp,
      scanType: scanType || 'QUICK',
      status: 'RUNNING',
      startedAt: new Date()
    });

    // Return immediately
    res.status(202).json({
      scanId: scan._id,
      message: 'Scan started',
      status: 'RUNNING'
    });

    // Execute scan in background (non-blocking)
    executeScanInBackground(scan._id, resolvedIp, scan.scanType);

  } catch (error) {
    console.error('Error creating scan:', error);
    res.status(500).json({ error: error.message });
  }
};

// Background execution function
async function executeScanInBackground(scanId, target, scanType) {
  try {
    console.log(`[Background] Starting scan ${scanId}`);

    // Execute scanners
    const results = await scannerService.executeScan(target, scanType);

    // Update scan status
    await Scan.findByIdAndUpdate(scanId, {
      status: 'COMPLETED',
      finishedAt: new Date()
    });

    console.log(`[Background] Scan ${scanId} completed`);

  } catch (error) {
    console.error(`[Background] Scan ${scanId} failed:`, error);

    await Scan.findByIdAndUpdate(scanId, {
      status: 'FAILED',
      finishedAt: new Date(),
      error: error.message
    });
  }
}