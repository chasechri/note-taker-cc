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

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  const dataNotes = fs.readFileSync(
    path.join(__dirname, "./develop/db/db.json"),
    "utf-8"
  );
  const parseNotes = JSON.parse(dataNotes);
  res.json(parseNotes);
});

app.listen(PORT, () => {
  console.log(`Api server now on port ${PORT}!`);
});
