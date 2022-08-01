import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("ecommerce");
  const data = await db.collection("items").find().toArray();

  const itemArrToObj = (arrData, idx) => {
    const result = {};
    arrData.forEach((item) => {
      result[item[idx]] = item;
    });
    return result;
  };

  res.status(200).json({
    status: 200,
    items: itemArrToObj(data, "_id"),
    message: "Success",
  });
  client.close();
};
