// Built-in modules
const path = require('path');

// External modules
const axios = require('axios');
const express = require('express');
const router = express.Router();

// Internal modules
const Visit = require('./db/model');

router.route('/maxComicNum').get(async (req, res) => {
    res.json((await axios.get('https://xkcd.com/info.0.json')).data.num);
});

router.route('/current').get(async (req, res) => {
    const data = (await axios.get('https://xkcd.com/info.0.json')).data;
    res.json(data);
});

router.route('/viewCount').get(async (req, res) => {
    const { comicNum } = req.query;

    const doc = await Visit.findOneAndUpdate(
        { comicNum: comicNum },
        { $inc: { visits: 1 } },
        { useFindAndModify: false, new: true, upsert: true }
    );

    res.json({ visits: doc.visits });
});

router.route('/:num').get(async (req, res) => {
    try {
        const comicNum = req.params.num;
        const data = (
            await axios.get(`https://xkcd.com/${comicNum}/info.0.json`)
        ).data;
        res.json(data);
    } catch (err) {
        res.json({ err: 'no image found' });
    }
});

module.exports = router;
