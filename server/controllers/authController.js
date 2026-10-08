const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {User} = require("../models");


//register
const register = async(req,res)=>{
    try{ 

        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                messages:"All Fields Are Required",
            });
        }

        const ExistingUser = await User.findOne({
            where:{email},
        });

        if(ExistingUser){
            return res.status(409).json({
                success:false,
                messages:"User Already Exists",
            });
        }

        const hashpassword = await bcrypt.hash(password,10);
        const user = await User.create({
            email,
            password:hashpassword,
            role:"employee",
        });

        return res.status(201).json({
            success:true,
            messages:"User Registered Successfully",
            data:{
                id:user.id,
                email:user.email,
                role:user.role,
            },
        });
    }catch(error){
      return res.status(500).json({
        success:false,
        messages:"Internal Server Error",
      });
    }
};


//login
const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                messages:"All Fields Are Required",
            });
        }

        const user = await User.findOne({where:{email}});
        if(!user){
            return res.status(401).json({
                success:false,
                messages:"Invalid Email Or Password",
            });
        }

        if(user.status!== "active"){
            return res.status(403).json({
                success:false,
                messages:"Account Is Inactive",
            });
        }
        
        const isValidPassword = await bcrypt.compare(password,user.password);

        if(!isValidPassword){
         return res.status(401).json({
            success:false,
            messages:"Invalid Password",
         });
         }

         const token = jwt.sign({
            id:user.id,
            email:user.email,
            role:user.role,
         },process.env.JWT_SECRET,{expiresIn:"1d"});


         return res.status(200).json({
            success:true,
            messages:"Loggin Successfull",
            data:{
                user:{
                    id:user.id,
                    email:user.email,
                    role:user.role,
                },
                token,
            }
         });
    
    }catch(error){
        return res.status(500).json({
            success:false,
            messages:"Internal Server Error",
        });
    }
};


module.exports = {register,login};