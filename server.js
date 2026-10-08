const app = require("./app");
const { sequelize } = require("./src/models");
const employeeRoutes=require("./src/routes/employee.routes")
const authRoutes = require("./src/routes/auth.routes");
const roleRoutes=require("./src/routes/role.routes")
const categoryRoutes=require("./src/routes/categories.routes")
const supplierRoutes=require("./src/routes/supplier.routes")
const productRoutes=require("./src/routes/product.routes")
const warehouseRoutes=require("./src/routes/warehouse.routes")
const stockInRoutes=require("./src/routes/stockIn.routes")
const stockOutRoutes=require("./src/routes/stockOut.routes")
const transferRoutes=require("./src/routes/transfer.routes")

const cookieParser = require("cookie-parser");
const errorHandler = require("./src/middleware/errorHandler");

require("dotenv").config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);


const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/employee", employeeRoutes);
app.use("/role", roleRoutes)
app.use("/category",categoryRoutes)
app.use("/supplier", supplierRoutes)
app.use("/product", productRoutes)
app.use("/warehouse", warehouseRoutes)
app.use("/stockin", stockInRoutes)
app.use("/",stockOutRoutes)
app.use("/", transferRoutes)


app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => console.log(`server started at ${PORT}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
