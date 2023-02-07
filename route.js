const express = require("express");
const path = require("path");
const app = express();

app.get("/register", (req, res) => {
  res.sendFile(path.join("C:UsersKunalOneDriveDesktop\forms", "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join("C:UsersKunalOneDriveDesktop\forms", "register.html"));
});
