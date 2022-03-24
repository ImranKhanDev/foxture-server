const express = require("express");
const app = express();
var cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = proce.env.PORT || 9000;

app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cpjqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// here running the comment

client.connect((err) => {
  const fixtureCollection = client
    .db("fixture_user")
    .collection("fixtureCollection");
  const orderCollection = client.db("fixture_user").collection("order");

  app.post("/addProduct", async (req, res) => {
    const result = await fixtureCollection.insertOne(req.body);

    // console.log(result);
    res.send(result);
  });

  app.get("/products", async (req, res) => {
    const result = await fixtureCollection.find({}).toArray();
    // console.log(result);
    res.send(result);
  });

  app.post("/order", async (req, res) => {
    const result = await orderCollection.insertOne(req.body);

    console.log(result);
    res.send(result);
  });

  app.get("/orders", async (req, res) => {
    const result = await orderCollection.find({}).toArray();
    // console.log(result);
    res.send(result);
  });
});

app.get("/", (req, res) => {
  res.send("Hello FIXTURE BUDDY.!.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
