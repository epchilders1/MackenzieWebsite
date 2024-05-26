const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const app = express();
const profile = require('./profile');
const blogpost = require('./blogpost');

// Security middleware
app.use(helmet());

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8000', 'https://evan-childers.com'], // Add your allowed origins here
  methods: ['GET', 'POST'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));

app.get('/*', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../frontend/dist/index.html'),
    function(err){
      if(err){
        res.status(500).send(err);
      }
    }
  );
});

// Parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/profile', profile);
app.use('/blogpost', blogpost);

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
