var mongoose = require("mongoose");
Schema = mongoose.Schema;

var gameSchema = new Schema({
    id: { type: String },
    players: [{
        name: { type: String },
        playerBet: { type: Number },
    }],
});

module.exports = mongoose.model("gameModel", gameSchema);