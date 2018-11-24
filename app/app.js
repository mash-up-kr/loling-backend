const express = require('express');
const helmet = require('helmet');
const randomsRouter = require('./controllers/randoms');


const app = express();

app.use(helmet());
app.use('/api/v1/randoms', randomsRouter);

module.exports = app;
