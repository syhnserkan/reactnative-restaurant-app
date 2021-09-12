const { Order } = require("../models/order");
const { OrderFood } = require("../models/order-food");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 }); // siparişleri zamana göre sort ettim.

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderFoods",
      populate: {
        path: "product",
        populate: "category",
      },
    }); // orderItems içindeki product bilgilerini getirmek için

  if (!order) {
    res.status(500).json({ success: false });
  }
  res.send(order);
});

router.get("/get/totalsales", async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } }, // Admin panelinde toplam satışı göstermek için mongooseun bize sunduğu özelliği kullanarak tüm orderların fiyatını hesaplayan bir değer dönüyoruz.
  ]);
  if (!totalSales) {
    return res.status(400).send("The order sales cannot be generated !");
  }
  res.send({ totalsales: totalSales[0].totalsales });
});

router.get("/get/count", async (req, res) => {
  const orderCount = await Order.countDocuments((count) => count);
  if (!orderCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    orderCount,
  });
});

router.get("/get/userorders/:userid", async (req, res) => {
  const userOrderList = await Order.find({ user: req.params.userid })
    .populate({
      path: "orderFoods",
      populate: {
        path: "product",
        populate: "category",
      },
    })
    .sort({ dateOrdered: -1 }); // user siparişleri zamana göre sort ettim.

  if (!userOrderList) {
    res.status(500).json({ success: false });
  }
  res.send(userOrderList);
});

router.post("/", async (req, res) => {
  const {
    orderFoods,
    addressLine1,
    addressLine2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user,
  } = req.body;
  console.log("body", req.body);

  const orderFoodIds = Promise.all(
    orderFoods.map(async (orderFood) => {
      let newOrderFood = new OrderFood({
        quantity: orderFood.quantity,
        product: orderFood.product,
      });

      newOrderFood = await newOrderFood.save();
      console.log(newOrderFood);
      return newOrderFood._id;
    })
  );

  const resolvedOrderFoodIds = await orderFoodIds;

  const totalPriceArray = await Promise.all(
    resolvedOrderFoodIds.map(async (orderFoodId) => {
      const orderFood = await OrderFood.findById(orderFoodId).populate(
        "product",
        "price"
      );
      const totalPrice = orderFood.product.price * orderFood.quantity;
      return totalPrice;
    })
  );

  const calculatedTotalPrice = totalPriceArray.reduce((a, b) => a + b, 0);
  let order = new Order({
    orderFoods: resolvedOrderFoodIds,
    addressLine1,
    addressLine2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice: calculatedTotalPrice,
    user,
  });
  order = await order.save();

  if (!order) return res.status(404).send("the order cannot be created!");

  res.send(order);
});

router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  ); // I want to return new updated data.
  if (!order) return res.status(404).send("the order cannot be updated!");

  res.send(order);
});

router.delete("/:id", (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(async (order) => {
      if (order) {
        await order.orderFoods.map(async (orderFood) => {
          await OrderFood.findByIdAndRemove(orderFood);
        });
        return res
          .status(200)
          .json({ success: true, message: "the order is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the order not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;

// {
//     "orderFoods" : [
//         {
//             "quantity": 3,
//             "product" : "60c12e5a6e37d33a2c3d322a"
//         },
//         {
//             "quantity": 2,
//             "product" : "60c12ec9c0000523389091cf   "
//         }
//     ],
//     "addressLine1" : "Flowers Street , 45",
//     "addressLine2" : "1-B",
//     "city": "Prague",
//     "zip": "00000",
//     "country": "Czech Republic",
//     "phone": "+420702241333",
//     "user": "60c1d289a944323d54511b5a"
// }
