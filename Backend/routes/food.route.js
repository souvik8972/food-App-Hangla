import express from "express";
import { upload } from "../middleware/multer.js"
const routes=express.Router()
import { saveFood,getFoodItems,deleteFood } from "../controllers/food.controller.js"

routes.post("/add",upload.single("image"),saveFood)

routes.get("/all/foods",getFoodItems)

routes.delete("/delete/:id",deleteFood)

export default routes