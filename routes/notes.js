const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require("../helpers/fsUtils.js");
const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require("uuid");

notes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/db/db.json'))
});

notes.post('/', (req, res) => {
  
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json('Note added!')
  } else res.error('Error in adding Note.')
});

notes.delete('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id !== noteId);

      writeToFile('./db/db.json', result);

      res.json(`Item ${noteId} has been deleted.`);
    });
});

module.exports = notes;