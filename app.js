const express = require("express"),
    logger = require('morgan'),
    app = express(),
    http = require("http"),
    server = http.createServer(app),
    mongoose = require("mongoose");
    cookieParser = require('cookie-parser')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.set('view engine', 'pug');

require('dotenv').config({
    path:   `./environments/${process.env.SCOPE === 'development' ? process.env.SCOPE : 'production'}.env`
});

mongoose.connect(process.env.MONGODB_URI).then(() =>{
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log(err);
});


const router = express.Router();

app.use("/", require("./controllers/createGame"));

app.use("/", require("./controllers/getGame"));

app.use("/", require("./controllers/getWinner"));

app.use("/", require("./controllers/startGame"));

router.get("/", (req, res) => {
    res.render('index', { pageName: "Game connection" });
});

app.use(router);

module.exports = app;