import { foodPartnerModel } from "../models/foodPartner.model.js";
import jwt from "jsonwebtoken"

const authFoodPartnerMiddleware = async(req, res, next)=>{
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message: "Login required!!!"
            })
        }

        const decoaded = await jwt.verify(token, process.env.JWT_SECRET)

        const foodPartner = await foodPartnerModel.findById(decoaded._id)

        req.foodPartner = foodPartner;

        next();

    } catch (error) {
        console.log("Invalid token!!! ",error)
    }
}

export {
    authFoodPartnerMiddleware
}