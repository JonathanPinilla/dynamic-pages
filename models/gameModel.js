var mongoose = require("mongoose");
Schema = mongoose.Schema;

var gameSchema = new Schema({
    _id: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    gamers: [{
        type: String
    }],
    inProgress: {
        type: Boolean,
        trim: true
    },
    winner: {
        type: String,
        trim: true
    }
}, { versionKey: false });

module.exports = mongoose.model("gameModel", gameSchema);