import express from "express";
import {allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrder, verifyRazorpay, verifyStripe} from '../controllers/orderController.js'
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

//payment features
orderRouter.post('/place-order',authUser, placeOrder);
orderRouter.post('/stripe',authUser, placeOrderStripe);
orderRouter.post('/razorpay',authUser, placeOrderRazorpay);

// User Features
orderRouter.post('/user-orders',authUser, userOrder);

// verify payment
orderRouter.post('/verify-stripe',authUser, verifyStripe)
orderRouter.post('/verify-razorpay',authUser, verifyRazorpay)

export default orderRouter;