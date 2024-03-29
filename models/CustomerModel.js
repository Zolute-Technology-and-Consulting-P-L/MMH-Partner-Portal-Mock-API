const mongoose = require('mongoose');

const customertSchema = new mongoose.Schema({
    firstname: {
        type:String,
    },
    lastname:{
        type:String
    },
    email: {
        type: String
    },
    contact:{
        type:Number
    },
    linkable:{
        type:String
    },
    isd:{
        type:Number,
    },
    otp:{
        type:Number
    }
})

module.exports = mongoose.model('customers',customertSchema);