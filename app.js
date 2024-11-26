const express = require('express');
const cors = require('cors'); // Import CORS
const userRoutes = require('./routes/user.routes'); // Ensure the routes file is imported correctly
const path = require('path'); // Import path module to resolve file paths
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS only for the Angular frontend
app.use(cors({ origin: 'http://localhost:4200' }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Your routes
app.use('/api/users', userRoutes);

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
