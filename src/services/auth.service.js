const { Employee } = require("../models");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../utils/generateToken");
const loginService = async (email, password) => {
  const employee = await Employee.findOne({ where: { email } });
  if (!employee) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, employee.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const accessToken = generateAccessToken({
    id: employee.id,
    email: employee.email,
  });
  const refreshToken = generateRefreshToken({ id: employee.id });

  return { accessToken, refreshToken };
};

const getAllEmployees = async (employeeId) => {
  const employee = await Employee.findOne({
    where: {
      id: employeeId,
    },
    attributes: ["id", "name", "email"],
  });

  if (!employee) {
    throw new Error("Employee not found");
  }

  return employee;
};

const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  const decoded = verifyToken(refreshToken);

  if (!decoded) {
    throw new Error("Invalid refresh token");
  }

  const employee = await Employee.findByPk(decoded.id);

  if (!employee) {
    throw new Error("Employee not found");
  }

  const accessToken = generateAccessToken({
    id: employee.id,
    email: employee.email,
  });

  return { accessToken };
};





module.exports = { loginService, getAllEmployees , refreshTokenService};
