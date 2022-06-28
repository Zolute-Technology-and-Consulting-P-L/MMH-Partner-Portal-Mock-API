const mongoose = require("mongoose");
const dateTime = require("../middlewares/datetime");

const commissionSchema = new mongoose.Schema({

    commission_amount: {
        type:Number
    },
     commissionPercentage:{
        type:Number
     },
      commissionType: {
        type:String
      },
        order_code: {
            type:String
        },
        date: {
            type:String,
            default:dateTime.dateTime
        },
            matureDate: {
                type:String,
                default:dateTime.dateTime
            },
            customePaidAmount:{
                type:Number
            },
            currency: {
                type:String
            },
            walletTransactionId: {
                type:String
            },
            commissionStatus: {
                type:String
            },
            customer: {
                type:Object
            }
    
})

module.exports = mongoose.model('commissions',commissionSchema);