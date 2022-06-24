const mongoose = require('mongoose');

const customerLinkSchema = new mongoose.Schema({
    partnerMobile:{
        type: Number
    },
    contact:{
        type:Number
    },
    firstname:{
        type:String
    },
    lastname:{
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