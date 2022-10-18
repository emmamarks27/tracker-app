const fs = require('fs');
require('dotenv').config(); // Load environment config

// Get a link to the database
const db = require('./db');

// Load in the SQL statements
const sql = fs.readFileSync('setup.sql').toString();

// Run the query
db.query(sql)
  .then((data) => console.log('Set-up complete.'))
  .catch((error) => console.log(error));
