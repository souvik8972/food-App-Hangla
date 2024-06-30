import express from 'express';
const orderRoute=express.Router();
import { placeOrder, verifyOrder } from '../controllers/order.controller.js';
import { athentication } from '../middleware/athentication.js';

orderRoute.post("/place-order",athentication,placeOrder)

orderRoute.post("/verify",verifyOrder)




export default orderRoute