// REDO MODULE 11 WITH CHALLENGE 11 A T THE SAME TIME
const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");
// let uuidv1 = require("uuidv1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// const dbNotesjson = require("./develop/db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static("./devlop/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// api routes

app.get("/api/notes", function (req, res) {
  readFileAsync("./develop/db/db.json", "utf-8").then(function (data) {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

app.post();

app.delete();

// html routes

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});

app.listen(PORT, function () {
  console.log("Api server now on port " + PORT);
});

// not working code

// app.get("/notes", (req, res) => {
//   res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
// });

// app.get("/api/notes", (req, res) => {
//   const noteData = fs.readFileSync(
//     path.join(__dirname, "./develop/db/db.json"),
//     "utf-8"
//   );
//   const parNote = JSON.parse(noteData);
//   res.json(parNote);
// });

// app.post("/api/notes", (req, res) => {
//   const noteData = fs.readFileSync(
//     (path.join(__dirname, "./develop/db/db.json"), "UTF-8")
//   );
//   const parNote = JSON.parse(noteData);
//   req.body.id = uuidv1();
//   parNote.push(req.body);

//   fs.writeFileSync(
//     path.join(__dirname, "./develop/db/db.json"),
//     JSON.stringify(parNote),
//     "UTF-8"
//   );
//   res.json("You have successfully added a note!");
// });

// // app.post("/api/notes");

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./develop/public/index.html"));
// });

// app.delete();

// app.listen(PORT, () => {
//   console.log(`Api server now on port ${PORT}!`);
// });
