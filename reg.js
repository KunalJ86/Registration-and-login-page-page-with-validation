const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

// Connect to MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kunal",
  database: "reglog",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Connected to database");
});

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/register", (req, res) => {
  const { firstName, lastName, username, password, age, bio } = req.body;

  const sql = `INSERT INTO users (first_name, last_name, username, password, age, bio)
               VALUES ('${firstName}', '${lastName}', '${username}', '${password}', ${age}, '${bio}')`;

  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.send("User registered successfully");
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
