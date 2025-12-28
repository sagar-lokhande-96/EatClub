import mongoose, { Schema } from "mongoose";

const foodPartnerSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        contactName:{
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },{
        timestamps: true
    }
)

export const foodPartnerModel = new mongoose.model("foodPartnerModel", foodPartnerSchema);