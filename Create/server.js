const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Develop', 'public')));

app.get('/notes', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Develop', 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'Develop', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  fs.readFile(path.join(__dirname, 'Develop', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, 'Develop', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(path.join(__dirname, 'Develop', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    notes = notes.filter(note => note.id !== id);
    fs.writeFile(path.join(__dirname, 'Develop', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) throw err;
      res.json({ ok: true });
    });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});




































// // These are the dependencies
// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const util = require('util');


// //This handles the asynchronous process
// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);



// // This sets up the server
// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// //this is the static middleware
// app.use(express.static('./develop/public'));


// //This is the API route (the "GET" request)
// app.get('/api/notes', funtion(req, res) {
//     readFileAsync("./Create/db/db.json", "utf8").then(funtion(data) {
//         notes = [].concat(JSON.parse(data))
//         res.json(notes);
//     })
// });


// //This is another API route (the "POST" request)
// app.post('/api/notes', function(req, res) {
//     const note = req.body;
//     readFileAsync('./Create/db/db.json', 'utf8').then(funtion(data) {
//         const notes = [].concat(JSON.parse(data));
//         note.id = note.length + 1
//         notes.push(note);
//         return notes
//     }).then(funtion(notes) {
//         writeFileAsync('./Create/db/db.json', JSON.stringify(notes))
//         res.json(note);
//     })
// });



// //This is last API route (the "DELETE" request)
// app.delete('/api/notes/:id', function(req, res) {
//     const deleteId = parseInt(req.params.id);
//     readFileAsync('./Create/db/db.json', 'utf8').then(funtion(data) {
//         const notes = [].concat(JSON.parse(data));
//         const newNotesData = []
//         for (let i = 0; i<notes.length; i++) {
//             if(deleteId !== notes[i].id) {
//                 newNotesData.push(notes[i])
//             }
//         }
//         return newNotesData
//     }).then(function(notes) {
//         writeFileAsync('./Create/db/db.json', JSON.stringify(notes))
//         res.send('saved successfully');
//     })
// });


// //These are the html routes
// app.get('notes', function(req, res) {
//     res.sendFile(path.join(__dirname, './Create/public/notes.html'));
// });


// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, './Create/public/notes.html'));
// });


// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, './Create/public/notes.html'));
// });


// // This is where it's listening
// app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
// });























// const express = require('express');
// const apiRoutes = require('./routes/api-routes')
// const htmlRoutes = require('./routes/html-routes')
// const PORT = process.env.PORT || 3001;

// const app = express();


// app.use(express.urlencoded({ extended: false}));
// app.use(express.json());
// app.use(express.static('public'));
// app.use(htmlRoutes)
// app.use(apiRoutes)

// app.listen(PORT, () => {
//     console.log(`server running on http://localhost:${}`)
// })