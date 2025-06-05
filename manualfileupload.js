// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static HTML form
app.use(express.static('views'));

// File upload handling route
app.post('/upload', (req, res) => {
    const boundary = req.headers['content-type'].split('boundary=')[1];
    let body = Buffer.alloc(0);

    req.on('data', chunk => {
        body = Buffer.concat([body, chunk]);
    });

    req.on('end', () => {
        const parts = body.toString().split(`--${boundary}`);

        for (const part of parts) {
            if (part.includes('Content-Disposition') && part.includes('filename')) {
                const match = part.match(/filename="(.+?)"/);
                const filename = match ? match[1] : 'uploaded_file';

                const fileStart = part.indexOf('\r\n\r\n') + 4;
                const fileContent = part.slice(fileStart, part.lastIndexOf('\r\n'));

                const filePath = path.join(__dirname, 'uploads', filename);
                fs.writeFileSync(filePath, fileContent, 'binary');
                res.send(`File uploaded as ${filename}`);
                return;
            }
        }

        res.status(400).send('No file uploaded.');
    });
});

// Create uploads folder if not exist
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
