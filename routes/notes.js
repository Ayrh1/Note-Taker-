const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');

// GET Route for retrieving all the feedback
notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
notes.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

notes.delete('/:id', (req, res) => {
  readFromFile('./db/db.json')
    .then((data) => {
      const notesArray = JSON.parse(data);
      const updatedNotesArray = notesArray.filter((note) => note.id !== req.params.id);

      fs.writeFile('./db/db.json', JSON.stringify(updatedNotesArray, null, 4), (err) => {
        if (err) {
          res.status(500).json({ message: 'Error writing to file', error: err.message });
        } else {
          res.status(200).json({ message: `Note with ID ${req.params.id} has been deleted.` });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error reading from file', error: error.message });
    });
});

module.exports = notes;
