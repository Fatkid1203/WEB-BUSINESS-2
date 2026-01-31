const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan")
app.use(morgan("combined"))

const path = require("path")
app.use(express.static(path.join(__dirname, "public")))

const cors = require("cors")
app.use(cors())
//create default API
app.get("/", (req, res) => {
    res.send("Hello <font color ='red'>Restful API</font>");
});

app.get("/about", (req, res) => {
    tbl = "<table border='1'>";
    tbl += "<tr>"
    tbl += "<td>Student Id</td><td>23411E0042</td>"
    tbl += "</tr>"
    tbl += "<tr>"
    tbl += "<td>Student Name</td><td>Huynh Tan Phat</td>"
    tbl += "</tr>"
    tbl += "<tr>"
    tbl += "<td colspan='2'><img src='/images/phat.jpg' width='500' height='500'></td>"
    tbl += "</tr>"
    tbl += "<tr>"
    tbl += "<td>Student Email</td><td>tanphat2511.2018@gmail.com</td>"
    tbl += "</tr>"
    tbl += "</table>"
    res.send(tbl);
});

app.listen(port, () => {
    console.log(`K23411E Server running at ${port}`);
});
let database = [
    {
        "BookId": "b1", "BookName": "Kỹ thuật lập trình cơ bản",
        "Price": 70, "Image": "p1.png"
    },
    {
        "BookId": "b2", "BookName": "Kỹ thuật lập trình nâng cao",
        "Price": 100, "Image": "p2.png"
    },
    { "BookId": "b3", "BookName": "Máy học cơ bản", "Price": 200, "Image": "p3.png" },
    { "BookId": "b4", "BookName": "Máy học nâng cao", "Price": 300, "Image": "p4.png" },
    { "BookId": "b5", "BookName": "Lập trình Robot cơ bản", "Price": 250, "Image": "p5.png" },
]

app.get("/books", (req, res) => {
    res.send(database);
});
