const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error(error);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});
