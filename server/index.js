"use strict";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import {
  createNewOrder,
  getItems,
  getProductDescription,
  getOrder,
} from "./handlers.js";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("tiny"));
app.use(express.static("./server/assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// REST endpoints?
app.get("/get-items", getItems);
app.get("/products/:product_id", getProductDescription);
app.post("/checkout", createNewOrder);
app.get("/confirmed-purchased", getOrder);

app.get("/", (req, res) =>
  res.status(200).json("Welcome to the e-commerce API!")
);
app.get("/bacon", (req, res) => res.status(200).json("🥓"));

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
