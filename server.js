const PORT = process.env.PORT || 3001;
const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

const notes = require("./db/db.json");

app.use(express.urlencoded({ extnended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
  res.json(notes.slice(1));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function createNote(body, noteArr) {
  const newNote = body;
  if (!Array.isArray(noteArr)) noteArr = [];

  if (noteArr.length === 0) noteArr.push(0);

  body.id = noteArr[0];
  noteArr[0]++;

  noteArr.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(noteArr, null, 2)
  );
  return newNote;
}

app.post("/api/notes", (req, res) => {
  const newNote = createNote(req.body, notes);
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
