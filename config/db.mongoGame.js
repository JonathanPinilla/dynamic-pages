const mongoose = require("mongoose");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

exports.connectDatabase = async () => {
    await mongoose.connect(
        "mongodb://localhost:27017/gameDB",
        options,
        (err, _) => {
            if (err) throw new Error("Failed to connect to database");
            console.log("Mongo is connected to gamesDB");
        }
    )
};