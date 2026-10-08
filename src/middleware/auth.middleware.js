const { verifyToken } = require("../utils/generateToken");

const EmployeeAuthMiddleware = (req, res, next) => {
const token = req.cookies.AccessToken;
  if (!token) {
    return res.status(401).json({ message: "Access Token mising" });
  }
  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "invalid token" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid or expired token" });
  }
};

module.exports =  EmployeeAuthMiddleware ;
