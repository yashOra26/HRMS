const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("HR MANAGEMENT SYSTEM API");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL connected successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("PostgreSQL connection failed:", error);
  });