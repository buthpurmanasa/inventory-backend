const { createEmployeeService, getAllEmployees } = require("../services/employee.service");
const createEmployeeController = async (req, res) => {
  try {
    const { name, email,roleId ,password} = req.body;
    const employee = await createEmployeeService(name, email, password, roleId);
    return res.status(201).json({
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: error.message,
     });
  }
};

const AllEmployees=async(req,res)=>{
  try {
    const response=await getAllEmployees();
    return res.status(200).json({ message: " Employee found", data: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports ={createEmployeeController, AllEmployees};
