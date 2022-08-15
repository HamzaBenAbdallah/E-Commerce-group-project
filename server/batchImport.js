import { MongoClient } from "mongodb";
import dotenv from "dotenv";

import items from "./data/items.json" assert { type: "json" };
import companies from "./data/companies.json" assert { type: "json" };

dotenv.config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    client.connect();
    const db = client.db("ecommerce");
    db.collection("items").insertMany(items);
    db.collection("companies").insertMany(companies);
  } catch (error) {
    console.log(error.message);
  }

  client.close();
};

batchImport();
