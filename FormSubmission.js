// index.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse form fields
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static HTML form
app.use(express.static('views'));

// if(!path.existsSync('uploads')) {
//     fs.mkdirSync('uploads', { recursive: true });
// }

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage: storage });

// Route 1: Handle form field submission
app.post('/submit-form', (req, res) => {
  console.log('Form Data:', req.body);
  res.send('Form fields received successfully!');
});

// Route 2: Handle file upload
app.post('/upload', upload.single('myFile'), (req, res) => {
  console.log('Uploaded File:', req.file);
  res.send('File uploaded successfully!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
