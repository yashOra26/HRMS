const sequelize = require("../config/db");

const User = require("./User");
const Employee = require("./Employee");
const Department = require("./Department");
const Designation = require("./Designation");

// Department → Employees
Department.hasMany(Employee, {
  foreignKey: "departmentId",
});

Employee.belongsTo(Department, {
  foreignKey: "departmentId",
});

// Department → Designations
Department.hasMany(Designation, {
  foreignKey: "departmentId",
  as:"designations",
});

Designation.belongsTo(Department, {
  foreignKey: "departmentId",
  as:"department",
});

// Designation → Employees
Designation.hasMany(Employee, {
  foreignKey: "designationId",
});

Employee.belongsTo(Designation, {
  foreignKey: "designationId",
});

module.exports = {
  sequelize,
  User,
  Employee,
  Department,
  Designation,
};