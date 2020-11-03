const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 1111;
const server = app.listen(PORT, () =>
  console.log(`Feeling chatty on port ${PORT}`)
);

//logging middleware
app.use(morgan("dev"));

//static middleware
app.use(express.static(path.join(__dirname, "..", "public")));

//body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//send index.html
app.use("*", (req, res, next) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

//handle 500 errors
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
