const express = require('express');
const router = express.Router();
// Import the controller functions (createScan and getScanStatus)
const scanController = require('../controllers/scancontroller'); 

// --- Scan Routes ---

/**
 * POST /scans
 * Route to initiate a new security scan job.
 * This should correspond to the successful curl test you just ran.
 */
router.post('/scans', scanController.createScan);

/**
 * GET /scans/:scanId
 * Route to retrieve the status and details of a specific scan job.
 * This uses the new getScanStatus function you added.
 */
router.get('/scans/:scanId', scanController.getScanStatus);

module.exports = router;
