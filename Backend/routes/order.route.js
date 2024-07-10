import express from 'express';
const orderRoute=express.Router();
import { placeOrder, verifyOrder,userOrders } from '../controllers/order.controller.js';
import { athentication } from '../middleware/athentication.js';

orderRoute.post("/place-order",athentication,placeOrder)

orderRoute.post("/verify",verifyOrder)

orderRoute.get("/orders",athentication,userOrders)



export default orderRoute