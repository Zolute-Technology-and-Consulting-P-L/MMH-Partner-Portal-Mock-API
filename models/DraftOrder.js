const mongoose = require('mongoose');

const draftOrderSchema = new mongoose({
    orderCode:{
        type:String
    },
    projectId:{
        type : Number,
        default:142
    },
    creationTime:{
        type:String
    },
    modifiedTime:{
        type: String
    },
    createdBy:{
        type:String
    },
    plot:{
        type: Object,
        default: {
            "length": "80",
            "width": "60",
            "floors": "1",
            "direction": "N",
            "type": "RESD",
            "builtUpArea": "4800",
            "numberOfRooms": "",
            "budget": "",
            "sketch": [],
            "siteImage": [],
            "notes": ""
        }
    },
    relatedDesigns:{
        type:Array
    },
    products:{
        type:Array
    },
    couponCode:{
        type:String
    },
    referralCode:{
        type:String
    },
    pricing:{
        type: Object,
        default:{
            "grossAmount": 0,
            "discountAmount": 0,
            "taxes": [],
            "netAmount": 0
        }
    },
    customer:{
        type:Object
    },
    isGstInvoice: {
        type:String,
        default:null
    },
    businessName: {
        type:String,
        default:null
    },
    gstNo: {
        type:String,
        default:null
    }
})

module.exports = mongoose.model('draft_orders',draftOrderSchema)