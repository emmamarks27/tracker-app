const express = require('express');
const cors = require('cors');

const db = require('./db');

const app = express();

// Add standard middleware
app.use(express.json());
app.use(cors());

// app routes

app.get('/', (req, res) => res.send('The tracker app: tracking the unknown.'));

module.exports = app;
