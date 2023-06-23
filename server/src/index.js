require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(uri, options)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send("Hello from Capt'n Dave's Seafood Market server!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
