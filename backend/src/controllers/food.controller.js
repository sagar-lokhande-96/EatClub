import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from "../services/storage.service.js"
import { foodPartnerModel } from '../models/foodPartner.model.js';
import { Food } from '../models/food.model.js';

const createFood = async(req, res) =>{
    try {
        const fileResult = await uploadFile(req.file.buffer, uuidv4())
        
        const foodData = Food.create({
            name: req.body.name,
            description : req.body.description,
            video : fileResult.url,
            Partner : req.foodPartner._id
    
        })
        
        return res.status(201).json({
            message: "Food created successfully",
            food: foodData
        })
    } catch (error) {
        console.log("Error while creating an food post!!! :",error)
    }
}


const getFoods = async(req, res) =>{
    try {
        const foods = await Food.find()

        return res.status(200).json({
            message: "Foods fetched successfully",
            foods: foods
        })
    } catch (error) {
        console.log("Error while fetching foods!!! :",error)
    }
}

export {
    createFood,
    getFoods
}