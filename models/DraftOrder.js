const mongoose = require('mongoose');

const draftOrderSchema = new mongoose.Schema({
    orderCode:{
        type:String
    },
    projectId:{
        type : Number,
        default:142
    },
    creationTime:{
        type:String,
        default:new Date().toISOString()
    },
    orderedAt:{
        type:Date,
        default:new Date().toISOString()
    },
    modifiedTime:{
        type: String
    },
    createdBy:{
        type:String
    },
    plot:{
        type: Object
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
    },
    currency:{
        type:String,
        default:"INR"
    }
})

draftOrderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
       
    }
})

module.exports = mongoose.model('draft_orders',draftOrderSchema)