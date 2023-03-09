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
app.post('/api/notes', (req, res) => {

    const { newTitle, newText } = req.body;

    readFromFile('./db/db.json').then((data) => {
        let db = JSON.parse(data)
        db.push({ id: uuid4v(), newTitle, newText});
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