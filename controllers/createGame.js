/**
 * Creates a new game 
 * @param express import express library
 * @param router imports the Router() function from express
 * @param gameModel imports the model of the game
 * @param playerModel imports the model of the player
 * @param mongoose imports the mongoose library
 * @param Shcema imports the class Schema from Mongoose library
 * @param app imports the app from app.js
 * @author Jonathan Daniel Pinilla Forero
 */

const express = require("express")
const router = express.Router();
var mongoose = require("mongoose");
Schema = mongoose.Schema;

const app = require("../app");

const gameModel = require("../models/gameModel");
const playerModel = require("../models/playersModel");


//POST - Create a new Game

/**
 * This class creates a new game from the parameters given by a form
 * @return redirect to getGame.js if everything is correct, otherwise returns the error
 */

router.post('/createGame', async (request, response, next) => {
    try {
        await gameModel.deleteMany();
        await playerModel.deleteMany();
        const { _id, gamers } = request.body;
        console.log(_id);
        console.log(gamers);
        const data = new gameModel({
            _id,
            gamers,
            inProgress: true,
        });
        gamers.forEach(element => {
            const theGamers = new playerModel({
                name: element,
            });
            theGamers.save();
        });

        await data.save();
        response.redirect(`/game/${data._id}`);
    } catch (error) {
        response.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
});

module.exports = router;