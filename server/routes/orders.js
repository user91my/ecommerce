import express from "express";
import { getOrders } from "../controllers/orders.js";

const router = express.Router();

router.post("/", getOrders);

export default router;
