const express = require("express");
const enviroment = require("./config/env");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

const server = express();
server.use(morgan("combined"));
server.use(cors());
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json());
server.use(expressValidator());
server.use("/api/v1", require("./routes/api/v1"));

server.listen(enviroment.port, () => {
  console.log(`server is listening at port ${enviroment.port}...`)
})