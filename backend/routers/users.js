const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const userList = await User.find().select("-passwordHash"); // We don't want to get passwordHash when we list the users.

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) {
    res.status(500).json({ message: "The user with given ID was not found !" });
  }
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const { name, email, phone, password, isAdmin } = req.body;
  let user = new User({
    name,
    email,
    phone,
    passwordHash: bcrypt.hashSync(password, 10),
    isAdmin,
  });
  user = await user.save();
  if (!user) return res.status(404).send("the user cannot be created!");

  res.send(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const secretKey = process.env.SECRET_KEY;
  if (!user) {
    return res.status(400).send("The user not found!");
  }

  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secretKey, // token is created by secret which we have here.
      {
        expiresIn: "1d", // expire time 1 day
      }
    );

    res.status(200).send({ user: user.email, token });
  } else {
    res.status(400).send("password is wrong !");
  }
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, isAdmin } = req.body;
  let user = new User({
    name,
    email,
    phone,
    passwordHash: bcrypt.hashSync(password, 10),
    isAdmin,
  });
  user = await user.save();
  if (!user) return res.status(404).send("the user cannot be created!");

  res.send(user);
});

router.get("/get/count", async (req, res) => {
  const userCount = await User.countDocuments((count) => count);
  if (!userCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    userCount,
  });
});

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "the user is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the user not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
