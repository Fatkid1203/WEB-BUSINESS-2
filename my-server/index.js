const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("Hello <font color ='red'>Restful API</font>");
});

app.get("/about", (req, res) => {
    let tbl = "<table border='1'>";
    tbl += "<tr><td>Student Id</td><td>23411E0042</td></tr>";
    tbl += "<tr><td>Student Name</td><td>Huynh Tan Phat</td></tr>";
    tbl += "<tr><td colspan='2'><img src='/images/phat.jpg' width='500' height='500'></td></tr>";
    tbl += "<tr><td>Student Email</td><td>tanphat2511.2018@gmail.com</td></tr>";
    tbl += "</table>";
    res.send(tbl);
});

let database = [
    {
        "id": "b1",
        "Tensach": "Kỹ thuật lập trình cơ bản",
        "Giaban": 70,
        "Mota": "Sách về lập trình cơ bản",
        "Anhbia": "p1.png",
        "Ngaycapnhat": "2024-10-25",
        "Soluongton": 120,
        "MaCD": 7,
        "MaNXB": 1
    },
    {
        "id": "b2",
        "Tensach": "Kỹ thuật lập trình nâng cao",
        "Giaban": 100,
        "Mota": "Sách về lập trình nâng cao",
        "Anhbia": "p2.png",
        "Ngaycapnhat": "2024-10-26",
        "Soluongton": 100,
        "MaCD": 3,
        "MaNXB": 2
    },
    { "id": "b3", "Tensach": "Máy học cơ bản", "Giaban": 200, "Mota": "Sách ML", "Anhbia": "p3.png", "Ngaycapnhat": "2024-10-25", "Soluongton": 200, "MaCD": 8, "MaNXB": 4 },
    { "id": "b4", "Tensach": "Máy học nâng cao", "Giaban": 300, "Mota": "Sách ML Advanced", "Anhbia": "p4.png", "Ngaycapnhat": "2024-10-25", "Soluongton": 50, "MaCD": 8, "MaNXB": 4 },
    { "id": "b5", "Tensach": "Lập trình Robot cơ bản", "Giaban": 250, "Mota": "Sách Robot", "Anhbia": "p5.png", "Ngaycapnhat": "2024-10-25", "Soluongton": 240, "MaCD": 7, "MaNXB": 1 },
];

app.get("/books", (req, res) => {
    res.send(database);
});

app.get("/books/:id", (req, res) => {
    const id = req.params.id;
    const book = database.find(b => b.id === id);
    if (book) {
        res.send(book);
    } else {
        res.status(404).send({ message: "Book not found" });
    }
});

app.post("/books", (req, res) => {
    const book = req.body;
    // Simple id generation
    book.id = "b" + (database.length + 1) + Math.floor(Math.random() * 1000);
    database.push(book);
    res.send(book);
});

app.put("/books", (req, res) => {
    const book = req.body;
    const index = database.findIndex(b => b.id === book.id);
    if (index !== -1) {
        database[index] = book;
        res.send(book);
    } else {
        res.status(404).send({ message: "Book not found" });
    }
});

app.delete("/books/:id", (req, res) => {
    const id = req.params.id;
    const index = database.findIndex(b => b.id === id);
    if (index !== -1) {
        database.splice(index, 1);
        res.send({ message: "Deleted successfully" });
    } else {
        res.status(404).send({ message: "Book not found" });
    }
});

app.listen(port, () => {
    console.log(`K23411E Server running at ${port}`);
});
