//imports
const express = require('express'); // import express library 
const path = require('path'); // import node.js package 'path' to resolve path of files that are located on the server 
const api = require('./routes/index'); // import route index.js 

//initializations 
const app = express(); // initialize an instace of express.js 

//port
const PORT = 3001; // port express.js will run on 

//middleware
app.use(express.static('public')); // point to files in oublic folder
app.use(express.json()); // parsing JSON data
app.use(express.urlencoded({extended:true})); // parsing urlencoded data
app.use('/api',api);  // api path 

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

