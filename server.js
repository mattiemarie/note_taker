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



// Port is Listening
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);