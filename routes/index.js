const express = require('express');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils.js');

const notesRouter = require('./notes');

const app = express()

app.use('/notes', notesRouter);

module.exports = app;

// needed endpoints:

// GET, ✔ POST ✔, DELETE ✔
// /api/notes ✔