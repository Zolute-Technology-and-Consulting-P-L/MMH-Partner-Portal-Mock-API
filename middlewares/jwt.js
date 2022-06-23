const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const PartnersModel = require('../models/PartnersModel');


dotenv.config();

// get password vars from .env file


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
 

    if (token == null) return res.sendStatus(401)
    let user = PartnersModel.findOne({mobile:token}).exec();
        if(!user){
             res.status(403).json({"message":"Invalid token"})
        }
   
        req.user = user
        next()
   
}

 function generateAccessToken(mobile) {
    console.log(mobile);
    return  jwt.sign({"mobile":mobile},process.env.TOKEN_SECRET);
}

function destroyToken(){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

   
}

module.exports = {
    authenticateToken,
    generateAccessToken
}