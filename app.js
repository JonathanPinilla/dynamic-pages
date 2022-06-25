/**
 * Main Class that will execute the whole application and will communicate with the controllers.
 * In this file we declarate the behavior of the application, for example the express librari to manage all the content.
 * @author Jonathan Daniel Pinilla Forero
 * 
 * @param express imports the express library
 * @param logger imports the morgan library
 * @param app is an express constant that will use that library
 * @param http defines the protocol
 * @param server creates a server using the protocol and the app
 * @param mongoose imports the libary of mongoose
 * 
 */

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
    path: `./environments/${process.env.SCOPE === 'development' ? process.env.SCOPE : 'production'}.env`
});

/**
 * Connects to the database 
 * @param procces.env.MONGODB_URI is the variable that will communicate with the environments, production or development
 */

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    console.log('running on localhost:8080');
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

/**
 * Exports the app so it can be usable in all the project
 */
module.exports = app;