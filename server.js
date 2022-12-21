const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { v4: uuidv4 } = require('uuid')

//Setting up Server
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded from data
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use(express.static('./develop/public'));

// Promise version of Fs.Readfile (mini project)
const readFromFile = util.promisify(fs.readFromFile);
const writeToFile = util.promisify(fs.readFromFile);

// GET request | API Route
app.get('/api/notes', function(req,res) {
    readFromFile('./develop/db/db.json', 'utf8').then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes)
    })
});

// POST request | API Route
app.post('/api/notes' , function(req, res) {
    const note = req.body;
    readFromFile('./develop/db/db.json', 'utf-8').then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFile('./develop/db/db.json', JSON.stringify(notes))
        res.json(note);
    })
});

// DELETE request | API Route
app.delete('/api/notes/:id', function(req,res) {
    const deletedNote = parseInt(req.params.id);
    readFile('./develop/db/db.json', 'utf8').then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNote = []
        for(let i = 0; i < notes.length; i++) {
            if(deletedNote !== notes[i].id)
                newNote.push(notes[i])
        }
    })
});

// GET Route for Home Page
app.get('/', (req,res) =>
    res.sendFile(path.join(_dirname, './develop/public/index.html'))
);

// GET Route for Notes Page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(_dirname, './develop/public/notes.html'))
);

// GET Route to direct users to a 404 page
app.get('*', (req, res) =>
    res.sendFile(path.join(_dirname, 'public/pages/404.html'))
);

// Port is Listening
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);