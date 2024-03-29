import express from "express";
import { getItems, getItem } from "../controllers/items.js";

const router = express.Router();

router
.get("/", getItems)
.get("/:id", getItem)


export default router;
