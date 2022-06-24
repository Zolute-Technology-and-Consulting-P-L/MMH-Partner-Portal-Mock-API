const mongoose = require("mongoose");

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
            type:String
        },
            matureDate: {
                type:String
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