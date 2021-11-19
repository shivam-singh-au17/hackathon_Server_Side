require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.DB_URL

const connect = () => {

    return mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false

    }, (err) => {

        if (err) {
            console.log("ERROR", err);
        }

    });
}


module.exports = connect;


