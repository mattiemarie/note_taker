const express = require('express');
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded from data
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use(express.static('public'));

// GET Route for Home Page
app.get('/', (req,res) =>
    res.sendFile(path.join(_dirname, './public/index.html'))
);

// GET Route for Notes Page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(_dirname, './public/notes.html'))
);

// Promise version of Fs.Readfile (mini project)


// GET Route for saved Notes
app.get('/api/notes', (req,res) => {
    readFromFile('./Develop/db/db.json', 'utf8').then((data) => res.json(JSON.parse(data)))
});

// POST Route for saved Notes
app.post('/api/notes' , (req, res) => {
    const note = req.body;
    readFromFile('./Develop/db/db.json', 'utf-8').then((data) => res.json(JSON.parse(data)))
})

// DELETING Routes for saved Notes
app.delete()

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);