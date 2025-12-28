import { Router } from "express";
import { loginFoodPartner, loginUser, logoutFoodPartner, logoutUser, registerFoodPartner, registerUser } from "../controllers/auth.controller.js";

const router = Router();


router.route("/user/register").post(registerUser)
router.route("/user/login").post(loginUser)
router.route("/user/logout").get(logoutUser)


router.route("/food-partner/register").post(registerFoodPartner)
router.route("/food-partner/login").post(loginFoodPartner)
router.route("/food-partner/logout").get(logoutFoodPartner)

export default  router 