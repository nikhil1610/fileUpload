const express = require('express');
const cors = require('cors');
const fileRoute = require('./routes/file');
require('./db/db');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(fileRoute);

app.listen(PORT, () => {
  console.log('server started on port 3030');
});