const express = require('express'); // importing a CommonJS module

const actionRouter = require('./data/helpers/action-router.js');

const server = express();

server.use('/api/actions', actionRouter);

module.exports = server;

// server.use('/api/actions')

// server.use(express.json());
