const notes = require('express').Router();
const { readFromFile, readAndAppend } = require ();


// GET Route for retrieving all the tips
tips.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data)));
});

//POST Route for a new Note
tips.post('/', (req,res) => {
    console.log(req.body);

    const { username, topic, tip } = req.body;

    if(req.body) {
        const newNote = {
            note
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully!`);
    } else {
        res.errored('Error adding Note')
    }
});

module.exports = notes;