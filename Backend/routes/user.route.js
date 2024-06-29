import express from 'express';
const routes=express.Router()
import {signup,login} from "../controllers/user.controller.js"


routes.post("/signup",signup)

routes.post("/login",login)







export default routes