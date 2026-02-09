const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3001;
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

// Serve static files from public directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/image/:id", cors(), (req, res) => {
    const id = req.params["id"];
    console.log('upload/' + id);
    res.sendFile(path.join(__dirname, 'upload', id));
});

app.post('/upload', (req, res) => {
    console.log('Upload request received');
    // Get the file that was set to our field named "image"
    if (!req.files || !req.files.image) {
        console.log('No files uploaded');
        return res.sendStatus(400);
    }
    const { image } = req.files;
    console.log('Uploading file:', image.name);

    // Move the uploaded image to our upload folder
    const uploadPath = path.join(__dirname, 'upload', image.name);
    image.mv(uploadPath, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).send(err);
        }
        console.log('Upload success');
        res.sendStatus(200);
    });
});

app.listen(port, () => {
    console.log(`Example app listening directly on port ${port}`);
    console.log(`Open your browser at http://localhost:${port}`);
});
