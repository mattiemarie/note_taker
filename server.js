const express = require('express');
const fs = require('fs');
const util = require('util')
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');



//Setting up Server
const PORT = process.env.PORT || 3001;
const app = express();

// // Promise version of fs.readFile
// const readFromFile = util.promisify(fs.readFile);

// // fs.writetofile
// const writeToFile = (destination, content) =>
//   fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
//     err ? console.error(err) : console.info(`\nData written to ${destination}`)
//   );

// Middleware for parsing JSON and urlencoded from data
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use(express.static(path.join(__dirname, "public")));


// GET Route for Home Page
app.get('/', (req,res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET Route for Notes Page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// GET saved notes
app.get('/api/notes',(req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});


//POST Route for a new Note
app.post('/api/notes', (req, res) => {

    const { title, text } = req.body;
    
    readFromFile('./db/db.json').then((data) => {
        let db = JSON.parse(data)
        db.push({ id: uuidv4(), title, text});
        writeToFile('./db/db.json', db);
        res.json(db);
        });
    });


// DELETE a note by id
app.delete('/api/note/:id', (req, res) => {

    const { noteid } = req.params;

    readFromFile('./db/db.json').then((data) => {
        let db = JSON.parse(data);
        
        // Make a new array of all tips except the one with the ID provided in the URL
        db = db.filter(note => note.noteid !== noteid)
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', db);
  
        // Respond to the DELETE request
        res.json(db);
      });
  });
  

// Port is Listening
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);