const express = require("express");
const fs = require("fs");
const path = require("path");
// const util = require("util");
const dbNotesjson = require("./db/db.json");

let uuidv1 = require("uuidv1");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// api routes

// html routes

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
