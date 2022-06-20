/**
 * This function determinates which of the players roll the higest number, if there is a draw, repeats until someone win
 */
async function game(_id) {
    const gameModel = require("../models/gameModel.js");
    const playerModel = require("../models/playersModel");

    const gameData = await gameModel.find();
    const playersData = await playerModel.find();

    const amountOfPlayers = playersData.length;

    let dice = [];

    playersData.forEach(element => {
        dice.push(Math.random() * (6 - 1) + 1);
    });

    const max = Math.max.apply(null, dice);

    const index = dice.indexOf(max);

    const winnerName = playersData[index].name;

    const winnerIs = await gameModel.findByIdAndUpdate(_id, {
        winner: winnerName
    });

    winnerIs.save();
}

module.exports = game;