import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        description:{
            type: String
        },
        video:{
            type: String,  // video file
            required: true
        },
        Partner:{
            type: mongoose.Types.ObjectId,
            ref: "foodPartner"
        }
    },
    {
        timestamps: true
    }
)

export const Food = new mongoose.model("Food", foodSchema)