const express = require("express");
const dotenv = require("dotenv").config();
const dbconnect = require("./config/dbConnection");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authenticate = require("./middleware/authMiddleware");
const mongoStore = require("connect-mongo");

//intializing our databases connecton
//you can see the config file for more info
dbconnect();

//app ans port initializations
const port = process.env.PORT || 5000;
const app = express();

//setting up ejs
app.set("view engine", "ejs");

//setting up middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECERETE,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  })
);
app.use('/user', require('./routes/userRoutes'))

app.get("/", (req, res) => {
  res.render("index", {title: 'Hello'});
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/a", (req, res) => {
  res.render("a", authenticate, {title: 'a'});
});


app.listen(port, () => {
  console.log(`app listening at ${port}`);
});
