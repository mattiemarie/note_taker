const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require ('../helpers/fs.Utilis');


// GET Route for retrieving all notes
notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        console.log(data)
       return res.json(JSON.parse(data));
    })
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

// DELETE Route for a specific tip
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

    // if(req.body) {
    //     const newNote = {
    //         createNewNote,
    //         deleteNewNote
    //     };

    //     readAndAppend(newNote, './db/db.json');
    //     res.json(`Note added successfully!`);
    // } else {
    //     res.errored('Error adding Note')
    // } 


module.exports = notes;