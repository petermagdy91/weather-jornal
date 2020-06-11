// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

const port = "2711";

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, listening);

function listening() {
  console.log(`server is running on port: ${port}`);
}

app.get("/all", (req, res) => {
  res.send(JSON.stringify(projectData));
});

app.post("/userInputs", (req, res) => {
  let data = req.body;
  projectData["temperature"] = data.temperature;
  projectData["date"] = data.date;
  projectData["userResponse"] = data.userResponse;
  console.log(projectData);
  res.end();
});
