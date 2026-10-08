const { Employee ,Role} = require("../models");
const { hashPassword } = require("../utils/bcrypt");
const createEmployeeService = async (name, email,password,  roleId) => {
  const hashedPassword = await hashPassword(password);
  const employee = await Employee.create({ name, email, password : hashedPassword,roleId });
  if (!employee) {
    throw new Error("Employee not created");
  }
  return employee;
};

const getAllEmployees=async()=>{
    const employees=await Employee.findAll({
      include:[
        {
          model: Role,
          as: "role",
          attributes: ["id", "name", "description"],
        }
      ]
    });
    return employees;
}


module.exports = {
  createEmployeeService,
  getAllEmployees
};
