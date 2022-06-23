const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
    name: {
        type:String,
    },
    mobile:{
        type:String
    },
    isd:{
        type:String,
    },
    otp:{
        type:String
    }
})

module.exports = mongoose.model('partners',PartnerSchema);