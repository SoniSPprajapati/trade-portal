require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const { HoldingModel } = require("./model/HoldingModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrderModel } = require("./model/OrderModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGODB_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ===== Routes =====
app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingModel.find();
  res.send(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find();
  res.send(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrderModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  await newOrder.save();
  res.send("Order created successfully");
});

app.get("/orders", async (req, res) => {
  try {
    const allOrders = await OrderModel.find();
    res.send(allOrders);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch orders" });
  }
});

// ===== Start Server & Connect to DB =====
app.listen(PORT, "0.0.0.0", () => {
 
  console.log(`Server is running on port ${PORT}`);
  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
});
