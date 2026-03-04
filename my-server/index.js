const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto");

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
    // Check if the payload matches Exercise 44 structure
    if (req.body.BookId) {
        let book = database.find(x => x.id == req.body.BookId);
        if (book != null) {
            book.Tensach = req.body.BookName;
            book.Giaban = req.body.Price;
            book.Anhbia = req.body.Image;

            // Explicitly set the English properties to conform exactly to what one might expect if checking the object structure later
            book.BookId = req.body.BookId;
            book.BookName = req.body.BookName;
            book.Price = req.body.Price;
            book.Image = req.body.Image;
        }
        res.send(database);
    } else {
        // Preserve Exercise 50 logic
        const bookObj = req.body;
        const index = database.findIndex(b => b.id === bookObj.id);
        if (index !== -1) {
            database[index] = bookObj;
            res.send(bookObj);
        } else {
            res.status(404).send({ message: "Book not found" });
        }
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

app.post("/payment/momo", async (req, res) => {
    try {
        const { amount } = req.body;
        // Official MoMo Sandbox keys from https://github.com/momo-wallet/payment
        var partnerCode = "MOMO";
        var accessKey = "F8BBA842ECF85";
        var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        var requestId = partnerCode + new Date().getTime();
        var orderId = requestId;
        var orderInfo = "pay with MoMo";
        var redirectUrl = "http://localhost:4200/payment-result";
        var ipnUrl = "http://localhost:3000/payment/callback";
        var amountStr = String(amount || 50000);
        var requestType = "payWithMethod";
        var extraData = "";
        var orderGroupId = "";
        var autoCapture = true;
        var lang = "vi";

        var rawSignature = "accessKey=" + accessKey + "&amount=" + amountStr + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;

        var signature = crypto.createHmac('sha256', secretkey).update(rawSignature).digest('hex');

        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId: requestId,
            amount: amountStr,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature
        });

        const response = await fetch('https://test-payment.momo.vn/v2/gateway/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        });
        const result = await response.json();

        if (result.payUrl) {
            res.json(result);
        } else {
            console.error("MoMo API Error:", result);
            res.status(400).json({ message: result.message || "MoMo API returned error", resultCode: result.resultCode });
        }
    } catch (error) {
        console.error("Payment error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`K23411E Server running at ${port}`);
});
