var mongoose = require("mongoose");
Schema = mongoose.Schema;

var gameSchema = new Schema({
    _id: {
        type: String,
        required: true,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true
    },
    gamers: [{
        type: String,
        required: true
    }],
    inProgress: {
        type: Boolean,
        trim: true
    },
    winner: {
        type: String,
        trim: true
    },
    winnerId:{
        type: String,
        trim: true
    }
}, { versionKey: false });

module.exports = mongoose.model("gameModel", gameSchema);