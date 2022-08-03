import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// const { v4: uuidv4 } = require ("uuid");
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export const updateQuantity = async (req, res) => {
//TO DO
}

export const addPurchase = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    console.log(req.body);
    await client.connect();
    const ecommerceData = client.db("ecommerce");
    const purchaseObject  = {_id:uuidv4(), ...req.body}
    await ecommerceData.collection("purchases").insertOne(purchaseObject);
    client.close()

        res.status(201).json({
            status: 201,
            purchaseObject,
            message: "Success",
        })
        

}

// module.exports = {updateQuantity, addPurchase}