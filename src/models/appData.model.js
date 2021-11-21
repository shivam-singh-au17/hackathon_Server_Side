const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let appDataSchema = new Schema(
    {
        cityFrom: { type: String },
        cityTo: { type: String },
        date: { type: String },
        qty: { type: Number },
        weight: { type: Number },
        dimensionsL: { type: Number },
        dimensionsW: { type: Number },
        dimensionsH: { type: Number },
    },
    { timestamps: true }
);

let AppData = mongoose.model("AppData", appDataSchema);

module.exports = AppData;

