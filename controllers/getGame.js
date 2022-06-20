const express = require("express")
const router = express.Router();

const gameModel = require("../models/gameModel.js");
const playerModel = require("../models/playersModel");
const game = require("./game.js");


//GET - Return all games in the DB

router.get('/game/:_id', async (request, response, next) => {
    try {
        const data = await gameModel.findById(request.params._id);

        const _id = data._id;
        const inProgress = data.inProgress;
        const gamers = await playerModel.find();
        
        const winner = await playerModel.findOne({'name': data.winner});

        if(data.inProgress == true){
            console.log("The game hasn't started yet, so there is no winner yet");
            response.json({
                message: 'The game has not started yet, so there is no winner yet',
                _id,
                gamers,
                inProgress,
                winner
            });
        }else {
            console.log("The game has finished, winner is: " + data.winner);
            response.json({
                _id,
                gamers,
                inProgress,
                winner
            });
        }
        
    } catch (error) {
        response.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
});

module.exports = router;