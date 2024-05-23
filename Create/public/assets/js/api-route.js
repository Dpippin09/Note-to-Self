const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ('fs')

router.get('/api/notes', async (req, res) => {
    const dbjson = await JSON.parse(fs.readFileSync('db/db.json',JSON.stringify(dbjson)))
});


router.post('/api/notes', (req, res) => {
    const dbjson = JSON.parse(fs.readFileSync('db/db.json',JSON.stringify(dbjson)))
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbjson.push(newFeedback);
    fs.writeFileSync('db/db.json',JSON.stringify(dbjson));
    res.json(dbjson);
});


router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync("db/db.json", 'utf8');
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync('db/db.json', JSON.stringify(newNotes));
});

module.exports = router;