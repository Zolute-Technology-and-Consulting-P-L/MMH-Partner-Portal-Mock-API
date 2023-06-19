const PartnersModel = require("../models/PartnersModel");
const auth = require("../middlewares/jwt");

const verifyOtp = async ({ mobile, otp }) => {
  let user = await PartnersModel.findOne({ mobile, otp }).exec();
  console.log("User:", user, mobile, otp);
  if (!user) {
    return null;
  }
  const token = mobile;

  // call toJSON method applied during model instantiation
  return { ...user.toJSON(), token };
};

const loginOtp = ({ isd, mobile }) => {};

function customerLink() {
  return true;
}

module.exports = { verifyOtp };
