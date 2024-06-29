import express from 'express';
const cartRoute=express.Router()
import { athentication } from '../middleware/athentication.js';
import { addToCart,removeFromCart,allCartItems  } from '../controllers/cart.controller.js';

cartRoute.post("/add",athentication,addToCart)
cartRoute.post("/remove", athentication, removeFromCart)

cartRoute.get("/all/items", athentication, allCartItems)






export default cartRoute