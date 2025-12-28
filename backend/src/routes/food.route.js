import { Router } from "express"
import { authFoodPartnerMiddleware } from "../middlewares/auth.middleware.js"
import { createFood, getFoods } from "../controllers/food.controller.js"
import multer, { memoryStorage } from "multer"
const router = Router()

const upload = multer({
    storage: memoryStorage() 
})

 /* POST /api/food  [protected]  */
router.route("/").post(authFoodPartnerMiddleware, upload.single("video"), createFood)


router.route("/").get(getFoods)
export default  router 