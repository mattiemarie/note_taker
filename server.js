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

// GET Route for saved Notes
app.get()

// POST Route for saved Notes
app.post()

// DELETING Routes for saved Notes
app.delete()

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);