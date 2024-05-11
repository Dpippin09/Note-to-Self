const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public'))
});

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes'))
});

module.exports = router;