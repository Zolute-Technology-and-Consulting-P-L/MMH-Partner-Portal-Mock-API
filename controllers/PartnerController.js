const PartnersModel = require("../models/PartnersModel");
const auth = require("../middlewares/jwt");

const verifyOtp = async ({ mobile, otp }) => {
  let user = await PartnersModel.findOne({ mobile: mobile });

  if (!user) {
    return null;
  }
  if (user.otp !== +otp) {
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
