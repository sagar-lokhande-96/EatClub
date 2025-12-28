// start the server here

import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})




import { app } from "./src/app.js";
import connectDB from "./src/db/db.js";

const PORT = process.env.PORT || 8080;


connectDB();

app.listen(PORT, ()=>{
    console.log(`App rendered on http://localhost:${PORT}`)
})

