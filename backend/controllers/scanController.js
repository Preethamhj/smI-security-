const ScannerService = require('../services/scanerservice');
const Scan = require('../models/Scan');
const {isvalidIpAddress, isvalidDomainName, resolveDomainName} = require('../utils/validator'); 
const dns = require('dns').promises; // Keep the dns import here for clarity

// --- FOR TESTING ONLY: Define a dummy user ID to satisfy Mongoose validation ---
const DUMMY_USER_ID = 'test-user-f00d-abcd-1234';

/**
 * Initiates a new scan job.
 */
exports.createScan = async (req, res) => {
  try {
    const { target, scanType } = req.body;
    
    // Assign the dummy user ID directly for non-authenticated testing.
    const userId = DUMMY_USER_ID; 

    // Validate input
    if (!target) {
      return res.status(400).json({ error: 'Target is required' });
    }

    let resolvedIp = target;

    // Check if the target is NOT a valid IP address. If it's not, we attempt DNS resolution.
    if (!isvalidIpAddress(target)) {
      if (!isvalidDomainName(target)) {
          return res.status(400).json({ error: 'Invalid target format. Must be a valid IP address or domain name.' });
      }
      
      try {
        // Attempt to resolve domain name to an IPv4 address
        const addresses = await dns.resolve4(target);
        // Use the first resolved IP
        resolvedIp = addresses[0]; 
      } catch (dnsError) {
        // If DNS resolution fails (domain doesn't exist or is unreachable)
        return res.status(400).json({ 
          error: 'Failed to resolve domain',
          details: dnsError.message 
        });
      }
    }
    console.log(" request has been came ");

    // Create scan record
    const scan = await Scan.create({
      userId: userId, 
      target: target,
      resolvedIp: resolvedIp,
      scanType: scanType || 'QUICK',
      // FIX: Changed 'RUNNING' to 'IN_PROGRESS' to match schema enum
      status: 'IN_PROGRESS', 
      startedAt: new Date()
    });

    // Return immediate 202 response (Accepted)
    res.status(202).json({
      scanId: scan._id,
      message: 'Scan job accepted and started in background.',
      status: 'IN_PROGRESS' // Match the response status as well
    });

    // Execute scan in background (non-blocking)
    executeScanInBackground(scan._id, resolvedIp, scan.scanType);

  } catch (error) {
    console.error('Error creating scan:', error);
    // Use a generic 500 status message for unhandled errors
    res.status(500).json({ error: 'Internal server error while initiating scan.' });
  }
};

/**
 * Retrieves the status and details of a specific scan job.
 */
exports.getScanStatus = async (req, res) => {
  try {
    const { scanId } = req.params;

    if (!scanId) {
      return res.status(400).json({ error: 'Scan ID is required.' });
    }

    const scan = await Scan.findById(scanId).select('target scanType status startedAt finishedAt error results');

    if (!scan) {
      return res.status(404).json({ error: 'Scan job not found.' });
    }

    // Return the relevant status information
    res.status(200).json(scan);
  } catch (error) {
    console.error(`Error retrieving scan status for ID ${req.params.scanId}:`, error);
    res.status(500).json({ error: 'Internal server error while retrieving scan status.' });
  }
};


// Background execution function
async function executeScanInBackground(scanId, target, scanType) {
  try {
    console.log(`[Background] Starting scan ${scanId} for target ${target} (${scanType})`);

    const results = await ScannerService.executeScan(target, scanType); 

    // Update scan status
    await Scan.findByIdAndUpdate(scanId, {
      status: 'COMPLETED',
      finishedAt: new Date(),
      results: results 
    });

    console.log(`[Background] Scan ${scanId} completed successfully.`);

  } catch (error) {
    console.error(`[Background] Scan ${scanId} failed:`, error);

    await Scan.findByIdAndUpdate(scanId, {
      status: 'FAILED',
      finishedAt: new Date(),
      error: error.message
    });
  }
}
