const mongoose = require("mongoose");
const withDrawlSchema = new mongoose.Schema({
            "requestdate":{
                type:String
            },
            "amount": {
                type:Number
            },
            "status": {
                type:String
            },
            "date": {
                type:Date
            },
            "comment": {
                type:String
            }
})

withDrawlSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.withdrawalid = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
       
    }
})

module.exports = mongoose.model('withdrawals',withDrawlSchema);