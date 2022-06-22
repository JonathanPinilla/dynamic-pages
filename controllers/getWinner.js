const express = require("express")
const router = express.Router();

const gameModel = require("../models/gameModel.js");
const playerModel = require("../models/playersModel");

//GET - Return whe winner

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