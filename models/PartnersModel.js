const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
    name: {
        type:String,
    },
    mobile:{
        type:Number
    },
    isd:{
        type:Number,
    },
    otp:{
        type:Number
    }
})

module.exports = mongoose.model('partners',PartnerSchema);