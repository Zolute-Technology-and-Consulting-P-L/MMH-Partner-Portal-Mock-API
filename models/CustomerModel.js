const mongoose = require('mongoose');

const customertSchema = new mongoose.Schema({
    name: {
        type:String,
    },
    email: {
        type: String
    },
    mobile:{
        type:String
    },
    isd:{
        type:String,
    },
    otp:{
        type:String
    }
})

module.exports = mongoose.model('customers',customertSchema);