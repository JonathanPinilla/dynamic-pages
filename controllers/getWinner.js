/**
 * Finds a winner if there is one, or returns that the game hasn't started yet if don't
 * @param express import express library
 * @param router imports the Router() function from express
 * @param gameModel imports the model of the game
 * @param playerModel imports the model of the player
 * @author Jonathan Daniel Pinilla Forero
 */


const express = require("express")
const router = express.Router();

const gameModel = require("../models/gameModel.js");
const playerModel = require("../models/playersModel");

//GET - Return whe winner

/**
 * Finds a winner using the game _id
 * @params _id is the id that will be granted by url
 * @returns a render of winner template in PUG and send to it 4 parameters, if there is an error returns it instead
 */

router.get('/game/:_id/winner', async(request, response, next) => {
    try {
        const data = await gameModel.findById(request.params._id);
        const gameId = request.params._id;
        const winner = await playerModel.findOne({'name': data.winner});
        if(data.inProgress == true){
            console.log('The game is not started')
        }else{
            const _id = winner._id;
            const name = winner.name;
            const gamerBet = winner.gamerBet;
            console.log(winner.totalBets);
            response.render("winner", {_id, name, gamerBet, gameId})
            /* response.json({
                message: 'The winner is:',
                winner
            }); */
        }
        
    } catch (error) {
        response.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
});


module.exports = router;