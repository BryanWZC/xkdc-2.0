// External modules
const mongoose = require('mongoose');

// Internal modules
const visitSchema = require('./schema');

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
