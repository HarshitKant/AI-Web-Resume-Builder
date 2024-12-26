const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
const generateRoute = require('./routes/generateRoute');
app.use('/generate', generateRoute);

// Serve HTML Form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
