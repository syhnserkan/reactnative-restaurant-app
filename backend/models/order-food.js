const mongoose = require("mongoose");

const orderFoodSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

orderFoodSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderFoodSchema.set("toJSON", {
  virtuals: true,
});

exports.OrderFood = mongoose.model("OrderFood", orderFoodSchema);
