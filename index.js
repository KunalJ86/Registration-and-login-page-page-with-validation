const routes = require("./route.js");
const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");

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

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "\\register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "\\login.html"));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/register", (req, res) => {
  const { f_name, l_name, username, email, password, age, bio } = req.body;

  const sql = `INSERT INTO users (f_name, l_name, username, email, password, age, bio)
               VALUES ('${f_name}', '${l_name}', '${username}','${email}', '${password}', ${age}, '${bio}')`;

  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.send("User registered successfully");
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.send("Login successful");
    } else {
      res.send("Login failed");
    }
  });
});
app.use("/static", express.static(path.join(__dirname + "public")));

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
