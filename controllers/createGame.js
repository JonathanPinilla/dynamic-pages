const express = require("express")
const router = express.Router();
var mongoose = require("mongoose");
Schema = mongoose.Schema;

const app = require("../app");

const gameModel = require("../models/gameModel");
const playerModel = require("../models/playersModel");


//POST - Create a new Game

router.post('/createGame', async (request, response, next) => {
    try {
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