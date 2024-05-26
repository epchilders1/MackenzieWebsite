const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const app = express();
const profile = require('./profile');
const blogpost = require('./blogpost');
require('dotenv').config();
// Security middleware
app.use(helmet());

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8000', 'https://evan-childers.com'], // Add your allowed origins here
  methods: ['GET', 'POST'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));

// Parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Routes
app.use('/profile', profile);
app.use('/blogpost', blogpost);

// Catch-all handler to serve the frontend's index.html for all other routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
