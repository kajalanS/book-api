const express = require("express");
const bodyParser = require("body-parser");

const index = express();
const router = require("./routes");

// index.use(express.json());

index.use(bodyParser.json());
index.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// index.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

index.use("/api", router);

module.exports = index;
