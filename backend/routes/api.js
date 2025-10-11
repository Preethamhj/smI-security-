// backend/src/routes/api.js - UPDATED
const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scancontroller'); 

// POST /api/v1/scans - Create a new scan and store in DB (Now functional)
router.post('/scans', scanController.createScan);

// GET /api/v1/scans/:id - Get scan status or results (Placeholder for Phase 2/3)
router.get('/scans/:id', (req, res) => {
    // This will connect to a read controller in Phase 2
    res.status(200).json({ 
        message: `Placeholder: Ready to fetch details for Scan ID ${req.params.id}` 
    });
});

module.exports = router;