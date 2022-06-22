const express = require("express");
const { findOneAndUpdate } = require("../models/gameModel.js");
const router = express.Router();

const gameModel = require("../models/gameModel.js");
const playerModel = require("../models/playersModel");
const game = require("./game");//imports the class that runs the game and determinates which player is the winner

//POST - Start a Game

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