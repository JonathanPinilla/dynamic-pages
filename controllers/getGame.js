/**
 * getGame is the controller that will get the game information stored in the database
 * @param express import the express library
 * @param router imports the Router() function from express
 * @param gameModel imports the model of the game
 * @param playerModel imports the model of the player
 * @param game imports the class game
 * @author Jonathan Daniel Pinilla Forero
 */

const express = require("express")
const router = express.Router();

const gameModel = require("../models/gameModel.js");
const playerModel = require("../models/playersModel");
const game = require("./game.js");


//GET - Return all games in the DB

/**
 * This class will find the game using the id recived by url
 * @params _id is the id to find the game, is obtined by url
 * @return a response to render a PUG template if there is a correct search, otherwise will return error
 */

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