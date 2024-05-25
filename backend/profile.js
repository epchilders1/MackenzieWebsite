const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

const assetsFolder = path.join(__dirname, '../frontend/public/gallery-assets');
const jsonFilePath = path.join(__dirname, '../frontend/public/data/galleryImage.js');

const router = express.Router();

function generateUniqueId() {
    return crypto.randomUUID();
}

router.use(fileUpload());

router.post('/', async (req, res) => {
    console.log('Received file upload request')
    try {
        const { avatar } = req.files;

        // Move the uploaded file to the assets folder
        await avatar.mv(path.join(assetsFolder, avatar.name));
        console.log('File uploaded:', avatar.name);

        // Generate a unique ID
        const uniqueId = generateUniqueId();

        const imageData = {
            id: uniqueId,
            cover: avatar.name
        };
        // Import the existing data from galleryImage.js file using dynamic import
        const existingDataModule = await import(jsonFilePath);
        const existingData = existingDataModule.data || [];

        // Push new image data to the existing data
        existingData.push(imageData);

        // Prepare the content to be written to the galleryImage.js file
        let fileContent = `const data = ${JSON.stringify(existingData, null, 2)};\n\n`;

        // Check if the getProducts function exists in the existing file content
        if (existingDataModule.getProducts) {
            // Include existing getProducts function
            fileContent += `const getProducts = ${existingDataModule.getProducts.toString()};\n\n`;
        } else {
            // If getProducts function doesn't exist, create a new one
            fileContent += 'const getProducts = () => {\n';
            fileContent += '    return data;\n';
            fileContent += '};\n\n';
        }

        // Export data and getProducts function
        fileContent += 'export { data, getProducts };';


        // Write the updated content back to the galleryImage.js file
        await fs.writeFile(jsonFilePath, fileContent);

        console.log('Successfully wrote to galleryImage.js');
        res.status(200).json({ message: 'File uploaded successfully', fileId: uniqueId });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
