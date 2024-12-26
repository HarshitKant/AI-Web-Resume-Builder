const express = require('express');
const fs = require('fs');
const path = require('path');
const openaiRequest = require('../config/openaiConfig'); // Import OpenAI configuration

const router = express.Router();

// POST endpoint for generating website templates
router.post('/', async (req, res) => {
    const { type, color, layout } = req.body;

    try {
        // Create prompt for OpenAI
        const prompt = `Generate an HTML and CSS template for a ${type} website with a ${color} theme and ${layout} layout.`;

        // Get response from OpenAI
        const code = await openaiRequest(prompt);

        // Save the generated code into a file
        const templatePath = path.join(__dirname, '..', 'templates', 'template.html');
        fs.writeFileSync(templatePath, code);

        // Provide download link for the file
        res.download(templatePath);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

module.exports = router;
