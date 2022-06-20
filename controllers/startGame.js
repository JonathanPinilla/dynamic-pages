const express = require("express")
const router = express.Router();

const gameModel = require("../models/gameModel.js");
const playerModel = require("../models/playersModel");
const game = require("./game");

const gameW = require("./game");//imports the class that runs the game and determinates which player is the winner

//POST - Start a Game

router.post('/startGame', async(request, response, next) => {
    try {
        const {_id, type, gamerBet} = request.body;
        game(_id);
        const data = await gameModel.findById(_id);
        const gamers = await playerModel.find();

        console.log(gamerBet);
        
        response.json({
            message: 'Game started!!',
            data
        });
    } catch (error) {
        response.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
});

module.exports = router;