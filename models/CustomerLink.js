const mongoose = require('mongoose');

const customerLinkSchema = new mongoose.Schema({
    partnerMobile:{
        type: Number
    },
    userId:{
        type : String
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
    },
    isdCode:{
        type:String,
        default:"91"
    }
})

module.exports = mongoose.model('customer_links',customerLinkSchema);