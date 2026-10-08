const {Department} = require("../models");

//create department
const createDepartment = async(req,res)=>{
    try{

        const {name,code,description,status} = req.body;
        if(!name || !code){
            return res.status(400).json({
                success:false,
                message:"Name And Code Fields Are Required",
            });
        }

        const ExistingName = await Department.findOne({where:{name}});
        if(ExistingName){
            return res.status(409).json({
                success:false,
                message:"Department Already Exists"
            })
        }

        const ExistingCode = await Department.findOne({where:{code}});
        if(ExistingCode){
            return res.status(409).json({
                success:false,
                message:"Code Already Exists",
            });
        }

        const department = await Department.create({
            name,
            code,
            description,
            status: status || "active",
        });

        return res.status(201).json({
            success:true,
            message:"Department Created Successfully",
            data:department,
        });
    
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        }); 
    }
};

//get all department
const getAllDepartment = async (req,res)=>{
    try{

    const department = await Department.findAll({
        order:[["createdAt","DESC"]],
    });

    return res.status(200).json({
        success:true,
        message:"Department Fetched Successfully",
        data:department,
    });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });
    }
}

//get department by id
const getDepartmentById = async (req,res)=>{
    try{

        const {id} = req.params;
        const department = await Department.findByPk(id);
        if(!department){
            return res.status(404).json({
                success:false,
                message:"Department Not Found",
            });
        }

        return res.status(200).json({
            success:true,
            message:"Department Fetched Successfully",
            data:department,
        });

    }catch(error){
        return res.status(500).json({
        success:false,
        message:"Internal Server Error"
        })
    }
}

//update department
const updatedDepartment = async (req,res)=>{
    try{

        const {id} = req.params;
        const {name,code,description,status} = req.body;
        const department = await Department.findByPk(id);
        if(!department){
            return res.status(404).json({
                success:false,
                message:"Department Not Found",
            });
        }
   
        if(name && name!== department.name){
            const ExistingName = await Department.findOne({where:{name}});
            if(ExistingName){
                return res.status(409).json({
                    success:false,
                    message:"Department Name Already Exists",
                });
            }
        }

        if(code && code!== department.code){
            const ExistingCode = await Department.findOne({where:{code}});
            if(ExistingCode){
                return res.status(409).json({
                    success:false,
                    message:"Code Already Exists",
                });
            }
        }

        await department.update({
            name:name || department.name,
            code:code || department.code,
            description:description || department.description,
            status:status || department.status,
        });

        return res.status(200).json({
            success:true,
            message:"Department Updated Successfully",
            data:department,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });
    }
};

//delete department 
const deleteDepartment = async(req,res)=>{
    try{
        const {id} = req.params;
        const department = await Department.findByPk(id);
        if(!department){
            return res.status(404).json({
                success:false,
                message:"Department Not Found",
            });
        }

        await department.destroy();

        return res.status(200).json({
            success:true,
            message:"Department Deleted Successfully",
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });
    }   
};

module.exports = {createDepartment,getAllDepartment,getDepartmentById,updatedDepartment,deleteDepartment};

