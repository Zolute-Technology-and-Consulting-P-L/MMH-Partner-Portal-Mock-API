const CustomerModel = require('../models/CustomerModel');

const auth = require("../middlewares/jwt");

const customerList = async (req, res) => {
    let users =  await  CustomerModel.find({});
    res.json(users);
}

async function login({ email, password }) {
    const user = await CustomerModel.findOne({email});
    
    // synchronously compare user entered password with hashed password
    
        if(bcrypt.compareSync(password, user.password)){
            console.log(user);
            const token = auth.generateAccessToken(email);
            console.log(token);
            // call toJSON method applied during model instantiation
            return {...user.toJSON(), token}
        }
    
    
}

async function customerInfo(mobile){
    return await CustomerModel.findOne({contact:mobile}).exec();
}

const verifyotp = async ({mobile,otp}) => {
    return await CustomerModel.findOne({contact,mobile,otp:otp});
}

const create = async (body) => {
   
    let user = new CustomerModel(body);
      return await user.save();
     
}

module.exports = {customerList,create,verifyotp,customerInfo};