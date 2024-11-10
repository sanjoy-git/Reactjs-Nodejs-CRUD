const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentsData = require("./database/localDb");

//Defining the express app
const app = express();


//Default use
app.use(cors()); //Enable cors for all requests.
app.use(bodyParser.json()); //Using bodyParser to parse json bodies into js objects.
app.use(bodyParser.urlencoded({ extended: true })); //Content-Type header matches

app.get('/students', (req, res) => {
  res.json(studentsData);
});

app.post('/studentAdd', (req, res) => {
});

app.put('/studentUpdate', (req, res) => {
  
});

app.delete('./studentDelete', (req, res) => {
  
});

//Root Path Test
app.get("/", (req, res) => {
  res.status(200).json([
    {
      status: "Server is Running",
      statusCode: 200,
    },
  ]);
});

//catch 404 and forward to error handler
app.use((req, res) => {
  res.status(200).json([
    {
      status: "Url not found.",
      statusCode: 404,
    },
  ]);
});

//Server listen for localhost
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port} 🔥`);
});
