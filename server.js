import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import Cards from "./models/Cards.js";

//API config
const app = express();
const port = 5000;
const connection_url = `mongodb+srv://admin:admin@dating-app.boene.mongodb.net/datingdb?retryWrites=true&w=majority`;

//middleware
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url, () => {
  console.log("connect to mongo succesfully");
});

//API end points
app.get("/", (req, res) => {
  res.send("Hello World! I am here");
});

app.post("/dating/card", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/dating/card", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//API listening
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
