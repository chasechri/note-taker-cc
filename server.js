const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");
// let uuidv1 = require("uuidv1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// const dbNotesjson = require("./develop/db/db.json");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./devlop/public"));

// api routes

app.get("/api/notes", function (req, res) {
  readFileAsync("./develop/db/db.json", "utf-8").then(function (data) {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

app.post("/api/notes", function (req, res) {
  const note = req.body;
  readFileAsync("./develop/db/db.json", "utf-8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      note.id = notes.length + 1;
      note.id.push(note);
      return notes;
    })
    .then(function (notes) {
      writeFileAsync("./develop/db/db.json", JSON.stringify(notes));
      res.json(note);
    });
});

app.delete("/api/notes/:id", function (req, res) {
  const idToDelete = parseInt(req.params.id);
  readFileAsync("./develop/db/db.json", "utf-8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      const newNotesData = [];
      for (let i = 0; i < notes.length; i++) {
        if (idToDelete !== notes[i].id) {
          newNotesData.push(notes[i]);
        }
      }
      return newNotesData;
    })
    .then(function (notes) {
      writeFileAsync("./develop/db/db.json", JSON.stringify(notes));
      readFileAsync.send("saved success");
    });
});

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
