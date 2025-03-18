const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/connection");
const port = process.env.PORT;
const callpoint = require("./Router/Endpointconnect");
const filesave = require("./controllers/filesave");
const Finduser = require("./controllers/Finduser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db();

app.use("/add", callpoint);
app.post("/filesaves", filesave);
app.post("/finduser", Finduser);
app.listen(port, () => {
  console.log("server listening on port", port);
});
