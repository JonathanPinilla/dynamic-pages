var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    http = require("http"),
    server = http.createServer(app),
    mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'pug');

const { connectDatabase } = require("./config/db.mongoGame.js");

connectDatabase();

var router = express.Router();

var gameCtrl = require("./controllers/gameController");

var gameRoutes = express.Router();

gameRoutes
    .route("/game")
    .get(gameCtrl.findAllGames)
    .post(gameCtrl.startGameOnePlayer);

app.use("/api", gameRoutes);

router.get("/", function (req, res) {
    res.render('index', { pageName: "Test game connection" });
});

app.use(router);

app.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
});