const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {sequelize} = require("./models");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const departmentRoutes = require("./routes/departmentRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth",authRoutes);
app.use("/test",testRoutes);
app.use("/department",departmentRoutes);

app.get("/",(req,res)=>{
  res.send("HR MANAGEMENT SYSTEM API");
});

const PORT = process.env.PORT || 5000;
 
const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("PostgreSQL connected successfully");

    await sequelize.sync();

    console.log("Database tables synchronized");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
};

startServer();