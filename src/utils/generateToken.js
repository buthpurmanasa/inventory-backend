
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "manasa@123";

 const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
module.exports={
    verifyToken,
    generateRefreshToken,
    generateAccessToken
}