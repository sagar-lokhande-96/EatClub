import { User } from "../models/user.model.js";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { foodPartnerModel } from "../models/foodPartner.model.js";



const registerUser = async(req, res)=>{
    try {
        const { fullName, email, password } = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({ message: "All fields are required!!"})
        }

        const userExists = await User.findOne({
            email
        });

        if(userExists){
            return res.status(401).json({
                message: "User already exists with this email!!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        })
        

        const token = jwt.sign({
            id: user._id,
        },process.env.JWT_SECRET)

        res.cookie("token", token);

        console.log(user.fullName,"has been registered successFully!!")
        return res.status(201).json({
            message: "User Registered Successfully!",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        })

    } catch (error) {
        console.log("Error in registerUser: ",error)
    }
}



const loginUser = async(req, res)=>{
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(401).json({
                message: "Email & password is required!!!"
            })
        }
    
        const user = await User.findOne({
            email
        })
    
        if(!user){
            return res.status(401).json({
                message: "Invalid email or password!!!"
            })
        }
    
        const isPassValid = await bcrypt.compare(password, user.password)
    
        if(!isPassValid){
            return res.status(401).json({
                message: "Invalid email or password!!!"
            })
        }
    
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET)
    
        res.cookie("token", token)
    
        console.log(user.fullName,"has been LoggedIn successFully!!")
        return res.status(200).json({
            message: "User LoggedIn successfull.",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        })
    } catch (error) {
        console.log("Error in loginUser : ",error)
    }
}

const logoutUser = async(req, res)=>{
    try {
        res.clearCookie("token")
        
        return res.status(200).json({
            message: "User has been lagout successfully!!!"
        }) 
    } catch (error) {
        console.log("Error during logoutUser: ", error)
    }
}

const registerFoodPartner = async(req, res) =>{
    try {
        const {name, email, password, contactName, mobile, address} = req.body;
        if(!name || !email || !password || !contactName || !mobile || !address){
            return res.status(401).json({
                message: "fields are required!!!"
            })
        }
    

        const foodPartnerExist = await foodPartnerModel.findOne({
            email
        }) 
        if(foodPartnerExist){
            return res.status(401).json({
                message:"foodPartner is already Exist!!"
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newFoodPartner = await foodPartnerModel.create({
            name,
            email,
            password: hashedPassword,
            contactName,
            mobile,
            address
        })
    
        const token = jwt.sign({
            _id : newFoodPartner._id
        }, process.env.JWT_SECRET)
    
        res.cookie("token", token)
        
        return res.status(200).json({
            message:"foodPartner has been Registered SuccessFully.",
            partner: {
                _id: newFoodPartner._id,
                name: newFoodPartner.name,
                email: newFoodPartner.email,
                contactName: newFoodPartner.contactName,
                mobile: newFoodPartner.mobile,
                address: newFoodPartner.address
            }
        })
    } catch (error) {
        console.log("Error in registerFoodPartner : ", error)
    }
}

const loginFoodPartner = async(req, res) =>{
    try {
        const { email, password} = req.body;
    
        if(!email || !password){
            return res.status(401).json({
                message: "Email or password is required!!!"
            })
        }

        const partner = await foodPartnerModel.findOne({
            email
        })
        if(!partner){
            return res.status(401).json({
                message: "Email or password is required!!!"
            })
        }
        
        const isPassValid = await bcrypt.compare(password, partner.password);

        if(!isPassValid){
            return res.status(401).json({
                message: "Please check the password!!!"
            })
        }

        const token = jwt.sign({
            _id: partner._id
        }, process.env.JWT_SECRET)
        res.cookie("token", token)
        

        console.log(partner.name,"(partner) has been LoggedIn.")
        return res.status(201).json({
            message:"Partner has been LoggedIn successfully.",
            foodPartner:{
                _id : partner._id,
                name: partner.name,
                email: partner.email
            }
        })

    } catch (error) {
        console.log("Error during loginFoodPartner : ",error)
    }
    
}

const logoutFoodPartner = async(req, res)=>{
    try {
        res.clearCookie("token")
        return res.status(201).json({
            message:"food Partner Logout Successfully."
        })
    } catch (error) {
        console.log("Error during logoutFoodPartner : ",error)
    }
}


export {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}