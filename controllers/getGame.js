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
        
        let winner = await playerModel.findById(data.winnerId);
        let startGame = "Start Game";
        if(data.inProgress == true){
            winner = "No winner yet!"
            response.render('getGame', {_id, gamers, inProgress, winner, startGame});
            /*response.json({
                message: 'The game has not started yet, so there is no winner yet',
                _id,
                gamers,
                inProgress,
            });*/
        }else {
            console.log("The game has finished, winner is: " + data.winner + " bet: "+winner.gamerBet);
            startGame = ""
            response.render('getGame', {_id, gamers, inProgress, winner, startGame});
            /*response.json({
                _id,
                gamers,
                inProgress,
                winner
            });*/
        }
        
    } catch (error) {
        response.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
});

module.exports = router;