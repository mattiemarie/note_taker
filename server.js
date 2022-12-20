const express = require('express');
const { writeFile } = require('fs');
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded from data
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use(express.static('./develop/public'));

// // GET Route for Home Page
// app.get('/', (req,res) =>
//     res.sendFile(path.join(_dirname, './develop/public/index.html'))
// );

// // GET Route for Notes Page
// app.get('/api/notes', (req, res) =>
//     res.sendFile(path.join(_dirname, './develop/public/notes.html'))
// );

// Promise version of Fs.Readfile (mini project)


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

// DELETING Routes for saved Notes
app.delete()

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);