// Add required modules
const express = require("express");
const path = require("path");
const fs = require("fs");

// Create server application at Port 3001
const app = express();
const PORT = process.env.PORT || 3001;
const mainDir = path.join(__dirname, "/public");

// Read URL or JSON
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(mainDir, "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(mainDir, "notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function (req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(savedNotes[Number(req.params.id)]);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(mainDir, "index.html"));
});

app.post("/api/notes", function (req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let uniqueID = savedNotes.length.toString();
  newNote.id = uniqueID;
  savedNotes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.json(savedNotes);
});

app.delete("/api/notes/:id", function (req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  let newID = 0;
  savedNotes = savedNotes.filter((currNote) => {
    return currNote.id != noteID;
  });

  for (currNote of savedNotes) {
    currNote.id = newID.toString();
    newID++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.json(savedNotes);
});

// Add Listener
app.listen(PORT, function () {
  console.log(`Now listening to port ${PORT}. http://localhost:${PORT}`);
});