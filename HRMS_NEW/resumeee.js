const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const pdf = require('pdf-parse');

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/process-resume', upload.single('resume'), (req, res) => {
    const buffer = req.file.buffer;

    pdf(buffer)
        .then((data) => {
            const text = data.text;
            // Extract data from the PDF text (e.g., name, email, etc.)
            // You may need to use regular expressions or other parsing methods
            const resumeData = {
                name: 'John Doe',
                // Add more fields as needed
            };
            res.json(resumeData);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to process the resume' });
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
