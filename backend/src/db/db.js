import mongoose, { mongo } from "mongoose";

const connectDB = async() =>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connection Sucessful !!!, DB-Host - ${connectionInstance.connection.host}`)


    } catch (error) {
        console.log("Error during the DB connection!!!")
        console.log(error)
    }
}

export default connectDB;