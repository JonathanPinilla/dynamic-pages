var mongoose = require("mongoose");
Schema = mongoose.Schema;

var playerSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    gamerBet: {
        type: Number
    },
}, { versionKey: false });

module.exports = mongoose.model("playersModel", playerSchema);