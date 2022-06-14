var mongoose = require("mongoose");
var gameModel = require("../models/gameModel.js");

//GET - Return all games in the DB
exports.findAllGames = function (req, res) {
    gameModel.find(function (err, gameDB) {
        if (err) res.send(500, err.message);
        console.log("Get/games");
        res.status(200).jsonp(gameDB);
    });
};

//POST - Create a new Game
exports.startGameOnePlayer = function (req, res) {
    console.log("POST");
    console.log(req.body);

    var game = new gameModel({
        id: req.body.id,
        players: [{
            name: req.body.name,
            playerBet: req.body.playerBet,
        }],
    });
    game.save(function (err, game) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(game);
    });
};