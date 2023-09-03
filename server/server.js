const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnection'); // Update the path to match your directory structure
const dotenv = require('dotenv').config();

connectDB();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use(express.static('public'));

app.use('/api', require('./routes/commentRoutes')); // Update the path to match your directory structure

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});