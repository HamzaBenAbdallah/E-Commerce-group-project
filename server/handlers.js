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

export const getProductDescription = async (req, res) => {
  let { product_id } = req.params;
  product_id = parseInt(product_id);
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const ecommerceData = client.db("ecommerce");
    const specificProduct = await ecommerceData
      .collection("items")
      .find({ _id: product_id })
      .toArray();

    console.log("specificProduct", specificProduct);

    if (specificProduct.length <= 0) {
      res.status(404).json({ Status: 404, Message: "Product not found" });
    } else {
      res.status(200).json({
        status: 200,
        params: product_id,
        Message: `Product ID:${product_id} found`,
        data: specificProduct,
      });
    }
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ Error: err });
  }

  client.close();
};
