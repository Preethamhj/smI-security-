// backend/src/controllers/scanController.js (CORRECTED)

const Scan = require('../models/scan');
const { isvalidIpAddress, isvalidDomainName, resolveDomainName } = require('../utils/validator'); 
const mongoose = require('mongoose');

// MOCK USER ID: Since authentication is not yet implemented, 
// we use a static, valid MongoDB ObjectId.
const MOCK_USER_ID = new mongoose.Types.ObjectId('60a7e7800000000000000001');

exports.createScan = async (req,res)=>{
 const { target , scanType='QUICK', scanOptions = {}} = req.body;
 
 if(!target){
    return res.status(400).json({
        error:'Validation Error',
        message:'A target (domain or IP address ) is required to start a scan '
    });
 }
 
 let finaltraget = target ;
 let resolveip = null;

 try{
    if(isvalidIpAddress(target)){
        resolveip = target;
    }
    else if(isvalidDomainName(target)){
        const cleanedDomain = target.replace(/^https?:\/\//,'');
        resolveip = await resolveDomainName(cleanedDomain);
        finaltraget = cleanedDomain;
    } else {
        // ADDED: Better error handling for invalid format
        return res.status(400).json({ 
            error: 'Validation Error', 
            message: 'Invalid target format. Please provide a valid IP address or domain name.' 
        });
    }
 }catch(err){
    return res.status(400).json({
        error:'Invalid Target',
        message: err.message
    });
 }
    
    try{
    const newScan = new Scan({
        // FIX: Use the MOCK_USER_ID instead of the undefined req.user.id
        userId: MOCK_USER_ID, 
        target: finaltraget,
        resolvedIp: resolveip,  
        scanType,
        scanOptions
    });

    const savedscan = await newScan.save();
    // NOTE: Changed status to 202 Accepted for background processing
    return res.status(202).json({ 
        message:'Scan request accepted and saved to database.',
        scanId: savedscan._id, // Return ID for status tracking
        target: savedscan.target,
        status: savedscan.status
    });
    }catch(err){
        console.error('Error creating scan:', err);
        // Return a 500 status for database errors
        return res.status(500).json({
            error:'Database Error',
            message:'Failed to save the scan request to the database. Check MongoDB connection/schema.'
        });
    }
}