const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema(
  {
    belongs_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
    truck_no: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    stops: { type: Array },
    capacity: { type: Number, required: true },
    filled: { type: Number, default: 0 },
    free: { type: Number, default: 0 },
    packages: { type: Array },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("truck", truckSchema);
