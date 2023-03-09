const express = require('express');
// const fs = require('fs');
const path = require('path');

const apiRoutes = require('./routes/notes');


//Setting up Server
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded from data
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use(express.static(path.join(__dirname, "public")));
app.use('/api', apiRoutes);


// GET Route for Home Page
app.get('*', (req,res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET Route for Notes Page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// GET `db.json` file/RETURN saved notes
app.get('/api/notes',(req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});


//POST Route for a new Note
notes.post('/notes', (req, res) => {

    const { newTitle, newText } = req.body;

    readFromFile('./db/db.json')
    .then((data) => {let db = JSON.parse(data)});
    db.push({ id: uuid4v(), newTitle, newText});
    return { newTitle, newText }
    })
    writeToFile('./db/db.json', db);
    res.json(db);


// DELETE a note by id
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.note_id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted`);
      });
  });
  

// Port is Listening
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);