const router = require("express").Router();
const Truck = require("../models/truck.model");
const Company = require("../models/company.model");
const { v4: uuid } = require("uuid");
// add a new company

router.post("/", async (req, res) => {
  try {
    req.body.free = req.body.capacity;
    const truck = await Truck.create(req.body);
    const company = await Company.findOneAndUpdate(
      { _id: req.body.belongs_to },
      { $push: { trucks: truck._id } }
    );
    res.status(201).json(truck);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const trucks = await Truck.find().lean().exec();
    res.status(200).json(trucks);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/book", async (req, res) => {
  try {
    const order = {
      from: req.body.from,
      to: req.body.to,
      weight: req.body.weight,

      order_id: uuid(),
    };
    console.log(order);
    // Should select a truck which goes from the given city to destination or passes by destination
    // as well as having free space sufficient enough
    const available_truck = await Truck.find({
      $and: [
        {
          $or: [
            { $and: [{ to: req.body.to }, { from: req.body.from }] },
            { $and: [{ from: req.body.from }, { stops: req.body.to }] },
          ],
        },
        {
          free: { $gte: req.body.weight },
        },
        {
          belongs_to: req.body.company_id,
        },
      ],
    }).sort({ capacity: -1 });

    if (available_truck) {
      const truck = await Truck.findByIdAndUpdate(
        available_truck[0]._id,
        {
          capacity: available_truck[0].capacity - req.body.weight,
          filled: available_truck[0].filled + req.body.weight,
          free: available_truck[0].free - req.body.weight,
          $push: { packages: order },
        },
        { new: true }
      )
        .lean()
        .exec();
      return res.status(200).json({
        message: "Booked Succesfully",
        order_id: order.order_id,
        truck,
      });
    }
    if (available_truck) return res.status(200).json(available_truck);
    return res.status(300).json({ message: "No truck available" });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = router;
