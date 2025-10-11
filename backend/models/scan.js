const mongoose  = require('mongoose');
const { Schema } = mongoose ;

const ScanSchema = new Schema ({
    userId :{
        type: String,
        required : true,
        ref : 'User'
    },
    target :{
        type: String,
        required:true ,
        trim :true 
    },
    resolvedIp:{
        type:String,
        required:true,
        trim:true
    },
    scanType:{
        type:String,
        required:true,
        enum :['FULL','QUICK','NETWORK','WEB','SSL'],
        default:'QUICK',
        required : true,
    },
    status:{
        type:String,
        enum:['QUEUED','IN_PROGRESS','COMPLETED','FAILED'],
        default:'QUEUED',
        required:true,
    }
});

module.exports = mongoose.model('Scan',ScanSchema);
