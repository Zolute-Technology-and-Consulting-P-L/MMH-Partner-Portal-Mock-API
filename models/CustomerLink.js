const mongoose = require('mongoose');

const customerLinkSchema = new mongoose.Schema({
    partnerMobile:{
        type: Number
    },
    mobile:{
        type:Number
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    linkStatus:{
        type:String,
        default:"direct"
    }
})

module.exports = mongoose.model('customer_links',customerLinkSchema);