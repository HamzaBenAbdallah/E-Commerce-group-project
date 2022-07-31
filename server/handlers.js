const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const { batchImport } = require("./batchImport");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getLandingPage = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const ecommerceData = client.db("ecommerce");
};

module.exports = {
  getLandingPage,
};
