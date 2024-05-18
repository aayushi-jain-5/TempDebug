import express from"express";
import authMiddleware from "../middleware/auth";
import { placeOrder, verifyOrder,userOrders,updateStatus,listOrders } from "../controllers/orderController";

const orderRouter= express.Router();

orderRouter.post("/place,",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get('/list',listOrders)
orderRouter.post("/status",updateStatus)


export default orderRouter;