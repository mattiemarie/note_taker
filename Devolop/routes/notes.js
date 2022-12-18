const notes = require('express').Router();
const { readFromFile, readAndAppend } = require ('../helpers/fs.Utilis');


// GET Route for retrieving all the tips
notes.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data)));
});

// GET Route for retrieving all notes
notes.get('/', (res, res) => {
    readFromFile('../db/db.json').then((data) =>res.json(JSON.parse(data)));
});

// GET Route for a specific note
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json ('No Note with that ID');
        });
});

//POST Route for a new Note
notes.post('/', (req, res) => {
    console.log(req.body);

    const { createNewNote, deleteNewNote } = req.body;

    if(req.body) {
        const newNote = {
            createNewNote,
            deleteNewNote
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully!`);
    } else {
        res.errored('Error adding Note')
    }
});

module.exports = notes;