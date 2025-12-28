//  creating an server

import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/auth.route.js"
import foodRoutes from "./routes/food.route.js"
import cors from 'cors';

const corsOptions = {
    origin: "http://localhost:5173/",
    credentials: true
};

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("Welcome to Zomato Clone Backend")
})

app.use("/api/auth", userRoutes)
app.use("/api/food", foodRoutes)

export { app };