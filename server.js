// REDO MODULE 11 WITH CHALLENGE 11 A T THE SAME TIME
const express = require("express");
const fs = require("fs");
const path = require("path");

const dbNotes = require("./develop/db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static("./devlop/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Api server now on port ${PORT}!`);
});
