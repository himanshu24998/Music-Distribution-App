const UserModel = require("../models/UserMongo");
const { oAuth2Client } = require("../Utils/googleConfig");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    console.log("Received Google authorization code:", code);

    const googleRes = await oAuth2Client.getToken(code);

    oAuth2Client.setCredentials(googleRes.tokens);
    console.log("Credentials set in oAuth2Client");

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    console.log("Google user info response:", userRes.data);

    const { email, name } = userRes.data;

    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({ email, name });
      console.log("Creating user with:", { email, name });
    } else {
    }

    const { _id } = user;
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    return res
      .status(200)
      .json({ message: "Success", token, user: { _id, email, name } });
  } catch (error) {
    console.error("Error in googleLogin:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  googleLogin,
};
