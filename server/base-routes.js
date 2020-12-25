// Built-in modules
const path = require('path');

// External modules
const express = require('express');
const router = express.Router();

router.route('/:num').get((req, res, next) => {
    const comicNum = req.params.num;
    const gotNonDigits = /\D+/.test(comicNum);
    if (gotNonDigits) return next();
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
