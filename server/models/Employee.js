const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    employeeCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: true,
    },

    joiningDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    designationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    employmentType: {
      type: DataTypes.ENUM("full_time", "part_time", "contract", "intern"),
      defaultValue: "full_time",
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "employees",
    timestamps: true,
  }
);

module.exports = Employee;