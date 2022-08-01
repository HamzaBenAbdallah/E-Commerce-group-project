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
  const ecommerceData = client.db("ecommerce");
  const itemsData = await ecommerceData.collection("items").find().toArray();

  const itemArrToObj = (arrData, idx) => {
    const result = {};
    arrData.forEach((item) => {
      result[item[idx]] = item;
    });
    return result;
  };

  const items = itemArrToObj(itemsData, "_id");

  if (Object.keys(items).length > 0) {
    return (
      res.status(200).json({
        status: 200,
        items,
        message: "Success",
      }),
      client.close()
    );
  } else {
    return (
      res.status(404).json({ status: 404, Message: "No items in database" }),
      client.close()
    );
  }
};
