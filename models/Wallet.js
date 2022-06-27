const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    balance:{
        type:Number
    },
    partnerId:{
        type:String
    }
})

walletSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.ID = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
       
    }
})

module.exports = mongoose.model('wallets',walletSchema);