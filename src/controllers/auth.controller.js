const { loginService, getAllEmployees, refreshTokenService } = require("../services/auth.service");

const loginController = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await loginService(email, password);
    res.cookie("AccessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
     console.log("LOGIN ERROR:", error);
    if (error.message === "Invalid email or password") {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return next(error);
  }
};

const getAllEmployeController = async (req, res) => {
  try {
      if (!req.user)
      return res.status(401).json({ message: "User not authenticated" });
    console.log("REQ USER:", req.user);
    const employee = await getAllEmployees(Number(req.user.id));
    return res.status(200).json({ message: " Employee found", data: employee });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const refreshTokenController=async(req,res)=>{
  try {
    const { RefreshToken } = req.cookies;
    const { accessToken } = await refreshTokenService(RefreshToken);
    res.cookie("AccessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });
    return res.status(200).json({ message: "Access  token generated successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const   logoutController = async (req, res) => {
  try {
    res.clearCookie("AccessToken");
    res.clearCookie("RefreshToken");

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = { loginController, getAllEmployeController,refreshTokenController , logoutController };
