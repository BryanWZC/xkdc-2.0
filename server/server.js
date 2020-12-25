// Built-in modules
const path = require('path');

// External modules
const express = require('express');
const app = express();
require('dotenv').config(path.join(__dirname, '../.env'));

// Internal modules
const connect = require('./db/connect');
const baseRoutes = require('./base-routes');
const dataRoutes = require('./data-routes');

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
if (process.env.NODE_ENV === 'DEVELOPMENT') app.use(require('morgan')('dev'));

// Routes
app.use('/', baseRoutes);
app.use('/data', dataRoutes);
app.use((req, res) => res.redirect('/'));

app.listen(process.env.PORT, async () => {
    await connect();
    console.log(`server connected at port ${process.env.PORT}`);
});
