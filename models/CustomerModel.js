const mongoose = require('mongoose');

const customertSchema = new mongoose.Schema({
    name: {
        type:String,
    },
    email: {
        type: String
    },
    mobile:{
        type:Number
    },
    isd:{
        type:Number,
    },
    otp:{
        type:Number
    }
})

module.exports = mongoose.model('customers',customertSchema);