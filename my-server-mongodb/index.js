const express = require('express');
const app = express();
const port = 3002;

const morgan = require("morgan")
app.use(morgan("combined"))

const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors({ origin: true, credentials: true }))

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
app.use(session({ secret: "Shh, its a secret!", resave: false, saveUninitialized: true }));

app.listen(port, () => {
    console.log(`My Server listening on port ${port}`)
})

app.get("/", (req, res) => {
    res.send("This Web server is processed for MongoDB")
})

const { MongoClient, ObjectId } = require('mongodb');
client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
database = client.db("FashionData");
fashionCollection = database.collection("Fashion");
userCollection = database.collection("User");
productCollection = database.collection("Product");

// ====== Exercise 63: Shopping Cart APIs ======

// In-memory cart store (simulates session storage)
var cartStore = {};

// Get all products
app.get("/shop/products", cors(), async (req, res) => {
    const result = await productCollection.find({}).toArray();
    res.send(result);
})

// Add product to cart
app.post("/shop/add-to-cart", cors(), (req, res) => {
    var cartId = req.body.cartId;
    var product = req.body.product;
    if (!cartStore[cartId]) {
        cartStore[cartId] = [];
    }
    // Check if product already in cart
    var found = false;
    for (var i = 0; i < cartStore[cartId].length; i++) {
        if (cartStore[cartId][i]._id == product._id) {
            cartStore[cartId][i].quantity++;
            found = true;
            break;
        }
    }
    if (!found) {
        product.quantity = 1;
        cartStore[cartId].push(product);
    }
    res.send({ message: "Product added to cart", cart: cartStore[cartId] });
})

// Get cart
app.get("/shop/cart", cors(), (req, res) => {
    var cartId = req.query.cartId;
    var cart = cartStore[cartId] || [];
    res.send(cart);
})

// Update cart (update quantities and remove checked items)
app.post("/shop/update-cart", cors(), (req, res) => {
    var cartId = req.body.cartId;
    var updates = req.body;
    var cart = cartStore[cartId] || [];

    // Remove checked items
    if (updates.removeIds && updates.removeIds.length > 0) {
        cart = cart.filter(item => !updates.removeIds.includes(item._id));
    }

    // Update quantities
    if (updates.items) {
        for (var i = 0; i < updates.items.length; i++) {
            for (var j = 0; j < cart.length; j++) {
                if (cart[j]._id == updates.items[i]._id) {
                    cart[j].quantity = updates.items[i].quantity;
                }
            }
        }
    }

    cartStore[cartId] = cart;
    res.send(cart);
})

// Clear cart
app.post("/shop/clear-cart", cors(), (req, res) => {
    var cartId = req.body.cartId;
    cartStore[cartId] = [];
    res.send({ message: "Cart cleared" });
})

app.get("/fashions", async (req, res) => {
    const result = await fashionCollection.find({}).toArray();
    res.send(result);
})

app.post("/auth/register", async (req, res) => {
    var username = req.body.name;
    var password = req.body.password;
    var result = await userCollection.findOne({ username: username, password: password });
    if (result != null) {
        res.cookie("username", username);
        res.cookie("password", password);
        res.send({ message: "Login successful", username: username });
    } else {
        res.status(401).send({ message: "Invalid username or password" });
    }
})

app.get("/auth/read-cookie", cors(), (req, res) => {
    var username = req.cookies.username || "";
    var password = req.cookies.password || "";
    res.send({ username: username, password: password });
})

app.get("/create-cookie", cors(), (req, res) => {
    res.cookie("username", "tranduythanh")
    res.cookie("password", "123456")
    account = {
        "username": "tranduythanh",
        "password": "123456"
    }
    res.cookie("account", account)
    //Expires after 360000 ms from the time it is set.
    res.cookie("infor_limit1", 'I am limited Cookie - way 1', { expire: 360000 + Date.now() });
    res.cookie("infor_limit2", 'I am limited Cookie - way 2', { maxAge: 360000 });
    res.send("cookies are created")
})

app.get("/read-cookie", cors(), (req, res) => {
    //cookie is stored in client, so we use req
    username = req.cookies.username
    password = req.cookies.password
    account = req.cookies.account
    infor = "username = " + username + "<br/>"
    infor += "password = " + password + "<br/>"
    if (account != null) {
        infor += "account.username = " + account.username + "<br/>"
        infor += "account.password = " + account.password + "<br/>"
    }
    res.send(infor)
})

app.get("/clear-cookie", cors(), (req, res) => {
    res.clearCookie("account")
    res.send("[account] Cookie is removed")
})

app.get("/contact", cors(), (req, res) => {
    if (req.session.visited != null) {
        req.session.visited++
        res.send("You visited this page " + req.session.visited + " times")
    }
    else {
        req.session.visited = 1
        res.send("Welcome to this page for the first time!")
    }
})
