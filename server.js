const PORT = process.envPORT || 3001;
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();
const mainDir = path.join(__dirname, "/public");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(mainDir, "index.html"));
});
