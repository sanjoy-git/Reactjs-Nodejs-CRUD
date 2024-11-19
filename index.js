const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentRoute = require("./routers/studentRoute");
const path = require("path");

//Defining The Express App
const app = express();

//Default use
app.use(cors()); //Enable Cors For Different URL All Requests
app.use(bodyParser.json()); //Using bodyParser To Parse Fson Bodies Into JS Objects
app.use(bodyParser.urlencoded({ extended: false })); //Content-Type Header Matches
app.use(express.static(path.join(__dirname, "public"))); // Public Folder Is A Public

// Routeing
app.use(studentRoute);  // studentRoute Use For Routing.This Route is Student CRUD Operation


//Default
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Server is Running",
    statusCode: 200,
  });
});

//Catch 404 | Not Found
app.use((req, res, next) => {
  res.status(200).json({
    status: "Url not found.",
    statusCode: 404,
  });
  next();
});

//Error Handler
app.use((error, req, res, next) => {
  if (res.headersSend) {
    next("Already Header Send.There was a problem!");
  } else {
    if (error?.message) {
      res.status(500).json({
        status: error?.message,
        statusCode: 500,
      });
    } else {
      res.status(500).json({
        status: "Something wrong!",
        statusCode: 500,
      });
    }
  }
});

//Server Listen For Localhost
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port} 🔥`);
});
