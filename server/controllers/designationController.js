const { where } = require("sequelize");
const { Designation, Department } = require("../models");
const { model } = require("mongoose");

//create designation

const createDesignation = async (req, res) => {
  try {
    const { name, departmentId, description, status } = req.body;
    if (!name || !departmentId) {
      return res.status(400).json({
        success: false,
        message: "Name And Department Id Are Required",
      });
    }

    const department = await Department.findByPk(departmentId);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department Not Found",
      });
    }

    const existigDesignation = await Designation.findOne({
      where: { name, departmentId },
    });

    if (existigDesignation) {
      return res.status(409).json({
        success: false,
        message: "Designation Already In Department",
      });
    }

    const designation = await Designation.create({
      name,
      departmentId,
      description,
      status: status || "active",
    });

    return res.status(201).json({
      success: true,
      message: "Designation Created Successfully",
      data: designation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get all designation
const getAllDesignation = async (req, res) => {
  try {
    const designation = await Designation.findAll({
      include: [
        {
          model: Department,
          as: "department",
          attributes: ["id", "name", "code"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Designation Fetched Successfully",
      data: designation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
