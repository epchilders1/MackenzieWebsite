const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');
const multer = require('multer'); // Import multer

const upload = multer({
    dest: path.join(__dirname, '/uploads') // Specify the destination folder for uploaded files
}); 

const router = express.Router();

// Define the folder and file paths for blog posts
const blogFolder = path.join(__dirname, '../frontend/public/blog-assets');
const jsonFilePath = path.join(__dirname, '../frontend/public/data/blogData.js');

// Function to generate a unique ID
function generateUniqueId() {
    return crypto.randomUUID();
}

// Endpoint to handle POST requests to create a new blog post
router.post('/', upload.array('images'), async (req, res) => { // Use multer to parse multipart/form-data
    try {
        const { description } = req.body; // Get description from req.body

        // Get file names from req.files
        const images = req.files.map(file => file.originalname);

        // Move uploaded files to the blog assets folder
        for (const file of req.files) {
            const oldPath = file.path;
            const newPath = path.join(blogFolder, file.originalname);
            await fs.rename(oldPath, newPath);
        }

        const existingDataModule = await import(jsonFilePath);
        const existingData = existingDataModule.data || [];

        // Create a new blog post object
        const blogPost = {
            id: generateUniqueId(),
            desc: description,
            images: images
        };

        // Push new image data to the existing data
        existingData.push(blogPost);

        // Prepare the content to be written to the blogData.js file
        let fileContent = `const data = ${JSON.stringify(existingData, null, 2)};\n\n`;

        // Check if the getPosts function exists in the existing file content
        if (existingDataModule.getPosts) {
            // Include existing getPosts function
            fileContent += `const getPosts = ${existingDataModule.getPosts.toString()};\n\n`;
        } else {
            // If getPosts function doesn't exist, create a new one
            fileContent += 'const getPosts = () => {\n';
            fileContent += '    return data;\n';
            fileContent += '};\n\n';
        }

        // Export data and getPosts function
        fileContent += 'export { data, getPosts };';

        // Write the updated content back to the blogData.js file
        await fs.writeFile(jsonFilePath, fileContent);

        console.log('Successfully wrote to blogData.js');
        res.status(200).json({ message: 'File uploaded successfully', postId: blogPost.id });
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
