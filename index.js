import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
app.use(express.json());
app.use(cors());
const URL = process.env.URL;
const PORT = process.env.PORT;

const createConnection = async () => {
  const client = new MongoClient(URL);
  await client.connect();
  console.log("MongoDB connected successfully...!");
  return client;
};
const client = await createConnection();

app.get("/", async (req, res) => {
  const data = await client.db("CRUD").collection("data").find({}).toArray();
  res.send(data);
});
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const data = await client
      .db("CRUD")
      .collection("data")
      .findOne({ _id: new ObjectId(id) });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.put("/edit-user/:id", async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    console.log(data);
    await client
      .db("CRUD")
      .collection("data")
      .updateOne(
        { _id: new ObjectId(id) },

        {
          $set: {
            name: req.body.name,
            img: req.body.img,
            about: req.body.about,
            role: req.body.role,
            address: req.body.address,
            company: req.body.company,
          },
        }
      );
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: err });
  }
});
app.put("/edit-profile/:id", async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    console.log(data);
    await client
      .db("CRUD")
      .collection("data")
      .updateOne(
        { _id: new ObjectId(id) },

        {
          $set: {
            name: req.body.name,
            img: req.body.img,
            about: req.body.about,
            role: req.body.role,
            address: req.body.address,
            company: req.body.company,
          },
        }
      );
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: err });
  }
});
app.post("/create-user", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    await client.db("CRUD").collection("data").insertOne({
      name: req.body.name,
      img: req.body.url,
      about: req.body.about,
      role: req.body.role,
      company: req.body.company,
      address: req.body.address,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: err });
  }
});
app.delete("/user/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const del = await client
      .db("CRUD")
      .collection("data")
      .deleteOne({ _id: new ObjectId(id) });
    res.send(del);
  } catch (err) {
    console.log(err);
  }
});
// app.get("/admin", async (req, res) => {
//   const admin = await client
//     .db("Batch")
//     .collection("AdminMails")
//     .find({})
//     .toArray();
//   res.send(admin);
// });

app.listen(PORT, () =>
  console.log(`server established successfully On the PORT:${PORT}`)
);
