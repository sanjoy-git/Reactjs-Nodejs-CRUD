const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentRoute = require("./routers/studentRoute");

//Defining the express app
const app = express();

//Default use
app.use(cors()); //Enable cors for all requests.
app.use(bodyParser.json()); //Using bodyParser to parse json bodies into js objects.
app.use(bodyParser.urlencoded({ extended: true })); //Content-Type header matches

// Routeing
app.use(studentRoute);


//Root Path Server Running Test.
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Server is Running",
    statusCode: 200,
  });
});

//catch 404 and forward to error handler
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

//Server listen for localhost
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port} 🔥`);
});
