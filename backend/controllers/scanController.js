const Scan = require('../models/scan');
const { isValidIpAddress, isValidDomainName, resolveDomainName } = require('../utils/validator'); 
const mongoose = require('mongoose');

exports.createScan = async (req,res)=>{
 const { target , scanType='QUICK', scanOptions = {}} = req.body;
 
 if(!target){
    return res.status(400).json({
        error:'Validation Error',
        message:'A target (domain or IP address ) is required to start a scan '
 
    });

 }
 let finaltraget=  target ;
 let resolveip = null;

 try{
    if(isValidIpAddress(target)){
        resolveip = target;
    }
    else if(isValidDomainName(target)){
        const cleanedDomain = target.replace(/^https?:\/\//,'');
        resolveip = await resolveDomainName(cleanedDomain);
        finaltraget = cleanedDomain;
    }       
 }catch(err){
    return res.status(400).json({
        error:'Invalid Target',
        message: err.message
    });
 }
    try{
    const newScan = new Scan({
        userId: req.user.id,
        target: finaltraget,
        resolvedIp: resolveip,  
        scanType,
        scanOptions
    });

    const savedscan = await newScan.save();
    return res.status(201).json({
        message:'Scan created successfully',
        scan: savedscan
    });
    }catch(err){
        console.error('Error creating scan:', err);
        return res.status(500).json({
            error:'Server Error',
            message:'An error occurred while creating the scan. Please try again later.'
        });
    }

}