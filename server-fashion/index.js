const express = require('express');
const app = express();
const port = 4000;

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

app.listen(port, () => {
    console.log(`Server Fashion listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("This is the Fashion REST API Server");
});

// ====== MongoDB Connection ======
const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
const database = client.db("FashionData");
const fashionCollection = database.collection("Fashion");

// ====== Fashion APIs ======

// GET all fashions, sorted by createdDate descending
app.get("/fashions", async (req, res) => {
    try {
        const result = await fashionCollection.find({}).sort({ createdDate: -1 }).toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// GET fashions filtered by Style
app.get("/fashions/style/:style", async (req, res) => {
    try {
        const style = req.params.style;
        const result = await fashionCollection.find({ style: style }).sort({ createdDate: -1 }).toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// GET all unique styles (for dropdown)
app.get("/fashions/styles/all", async (req, res) => {
    try {
        const result = await fashionCollection.distinct("style");
        res.send(result);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// GET a fashion by ObjectId
app.get("/fashions/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await fashionCollection.findOne({ _id: new ObjectId(id) });
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: "Fashion not found" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// POST add a new fashion
app.post("/fashions", async (req, res) => {
    try {
        const fashion = {
            title: req.body.title,
            details: req.body.details,
            thumbnail: req.body.thumbnail,
            style: req.body.style,
            createdDate: new Date()
        };
        const result = await fashionCollection.insertOne(fashion);
        fashion._id = result.insertedId;
        res.status(201).send(fashion);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// PUT edit a fashion
app.put("/fashions/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = {
            title: req.body.title,
            details: req.body.details,
            thumbnail: req.body.thumbnail,
            style: req.body.style
        };
        const result = await fashionCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );
        if (result.matchedCount === 0) {
            res.status(404).send({ message: "Fashion not found" });
        } else {
            const updated = await fashionCollection.findOne({ _id: new ObjectId(id) });
            res.send(updated);
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// DELETE a fashion by id
app.delete("/fashions/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await fashionCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            res.status(404).send({ message: "Fashion not found" });
        } else {
            res.send({ message: "Fashion deleted successfully" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});
