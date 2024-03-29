import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import path from "path";
import { fileURLToPath } from "url";

import itemsRoutes from "./routes/items.js";
import ordersRoutes from "./routes/orders.js";

import Item from "./models/Item.js";
import Order from "./models/Order.js";
import { itemData } from "./data/index.js"; // Import mock 'item' data

// CONFIGURATION
// __filename: /path/to/your/example.js
// __dirname: /path/to/your
const __filename = fileURLToPath(import.meta.url); // grab the full local path of the current module file (i.e. index.js).
const __dirname = path.dirname(__filename); // extracts the file path directory from '__filename'.

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
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
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
