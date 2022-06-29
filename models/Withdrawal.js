const mongoose = require("mongoose");
const dateTime = require("../middlewares/datetime");
const withDrawlSchema = new mongoose.Schema({
            requestdate:{
                type:String
            },
            amount: {
                type:String,
                default: "1400"
            },
            status: {
                type:String
            },
            date: {
                type:String,
                default:dateTime.dateTime
            },
            status:{
                type:String,
                default:"Pending"
            },
            createdBy:{
                type:String
            },
            comment: {
                type:String,
                default:"....."
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