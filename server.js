require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT

const connect = require("./src/config/db");

const appDataController = require("./src/controllers/appData.controlers");

app.use(cors());
app.use(express.json());

app.use(appDataController);

app.listen(port, async () => {

  await connect();
  console.log("Listening on post " + port);

})

module.exports = app;

