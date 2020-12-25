// External modules
const mongoose = require('mongoose');
require('dotenv').config(require('path').join(__dirname, '../../.env'));

async function connect() {
    await mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err) => console.log(err));
    mongoose.connection.on('error', (err) => console.log(err));
}

module.exports = connect;
