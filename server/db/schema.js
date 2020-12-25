const mongoose = require('mongoose');
const { Schema } = mongoose;

const visitSchema = new Schema({
    comicNum: Number,
    visits: {
        type: Number,
        default: 0,
    },
});

module.exports = visitSchema;
