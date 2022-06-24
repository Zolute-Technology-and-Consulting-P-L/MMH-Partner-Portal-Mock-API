const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    contact:{
        type:String
    },
    isdCode:{
        type:String
    },
    createdat:{
        type:String
    },
    comment:{
        type:String
    },
    manager:{
        type:Object
    },
    otp:{
        type:String
    }
})

leadSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.userID = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
       
    }
})

module.exports = mongoose.model('incoming_leads',leadSchema)