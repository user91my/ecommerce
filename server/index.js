import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import itemsRoutes from "./routes/items.js";
import ordersRoutes from "./routes/orders.js";

import Item from "./models/Item.js";
import Order from "./models/Order.js";
import { itemData } from "./data/index.js"; // Import mock 'item' data

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); // secures express app with various HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); // HTTP request logger middleware for nodejs
app.use(bodyParser.json()); // parses request (with a JSON payload) and makes it available in 'req.body'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.get("/", async (req, res) => res.json({ hello: "world" }));
app.use("/assets", express.static(path.resolve("./public/assets")));
app.use("/items", itemsRoutes);
app.use("/orders", ordersRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Connected to Server Port: ${PORT}`));

    // ADD DATA - ONE TIME ONLY!!!
    // --------------------------
    // Item.insertMany(itemData)
  })
  .catch((error) => console.log(`ERROR: ${error}`));
