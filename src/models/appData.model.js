const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let appDataSchema = new Schema(
    {
        userName: { type: String },
        userGender: { type: String },
        userEmail: { type: String }
    },
    { timestamps: true }
);

let AppData = mongoose.model("AppData", appDataSchema);

module.exports = AppData;

