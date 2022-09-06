const fs = require("fs");
const path = require("path");
const express = require("express");
const dbJson = require("./db/db.json");
var uuidv1 = require("uuidv1");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(bodyParser.urlencoded({ extended: false }));
// parse incoming JSON data
app.use(json());
app.use(static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "./public/index.html"));
});

app.get("/api/notes", (req, res) => {
  const dataNotes = readFileSync(join(__dirname, "./db/db.json"), "utf-8");
  const parseNotes = JSON.parse(dataNotes);
  res.json(parseNotes);
});

app.post("/api/notes", (req, res) => {
  const dataNotes = readFileSync(join(__dirname, "./db/db.json"), "utf-8");
  const parseNotes = JSON.parse(dataNotes);
  req.body.id = uuidv1();
  parseNotes.push(req.body);

  writeFileSync(
    join(__dirname, "./db/db.json"),
    JSON.stringify(parseNotes),
    "utf-8"
  );
  res.json("You have successfully added a note!");
});

// app.delete("/api/notes/:id", function (req, res) {
//   console.log(uuidv1());
//   console.log("Req.params:", req.params);
//   let deletedNote = parseInt(req.params.id);
//   console.log(deletedNote);

//   for (let i = 0; i < length; i++) {
//     if (deletedNote === dbJson[i].id) {
//       splice(i, 1);

//       let noteJson = JSON.stringify(dbJson, null, 2);
//       console.log(noteJson);
//       writeFile("./db/db.json", noteJson, function (err) {
//         if (err) throw err;
//         console.log("Your note has been deleted!");
//         res.json(dbJson);
//       });
//     }
//   }
// });

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const dbJson = require("./db/db.json");

// let uuidv1 = require("uuidv1");

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));

// app.get("./notes", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/notes.html"));
// });

// app.get("/api/notes", (req, res) => {
//   const noteData = fs.readFileSync(
//     path.join(__dirname, "./db/db.json"),
//     "utf-8"
//   );
//   const parseNotes = JSON.parse(noteData);
//   resjson(parseNotes);
// });

// app.listen(PORT, () => {
//   console.log(`Api server now on port ${PORT}!`);
// });
