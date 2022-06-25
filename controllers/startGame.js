/**
 * Starts the game adding the bets for every player, playing the game and returning the winner
 * @param express import express library
 * @param findOneAndUpdate imports the class to find and update one gameModel
 * @param router imports the Router() function from express
 * @param gameModel imports the model of the game
 * @param playerModel imports the model of the player
 * @param game imports the class game
 * @author Jonathan Daniel Pinilla Forero
 */

const express = require("express");
const { findOneAndUpdate } = require("../models/gameModel.js");
const router = express.Router();

const gameModel = require("../models/gameModel.js");
const playerModel = require("../models/playersModel");
const game = require("./game");//imports the class that runs the game and determinates which player is the winner

//POST - Start a Game

/**
 * This is the class that send the bets of every player and updates the every playerModel
 * @return redirect to getWinner if everything goes well, otherwise returns error
 */

router.post('/startGame', async (request, response, next) => {
    try {
        const { _id, gamerBets } = request.body;
        game(_id);
        const gamers = await playerModel.find();

        var totalBets = 0;

        await gamerBets.forEach((element, index) => {
            gamers[index].gamerBet = parseInt(element);
            totalBets = totalBets + parseInt(element);
            console.log(totalBets);
            console.log("_id: " + gamers[index]._id + " gamerBet: " + parseInt(element));
        });

        const data = await gameModel.findByIdAndUpdate(_id, {
            inProgress: false,
        });
        data.save();

        console.log(data.inProgress);

        const data2 = await gameModel.findById(_id);

        const winner = data2.winnerId;

        console.log("Data: " + data2);
        console.log("winner " + winner);

        const resolveBets = await playerModel.findOneAndUpdate(winner, {
            gamerBet: totalBets,
        });
        console.log(resolveBets);
        resolveBets.save();



        response.redirect(`/game/${_id}/winner`);
        /* response.json({
            message: 'Game started!!',
            gamers,
        }); */
    } catch (error) {
        response.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
});

module.exports = router;