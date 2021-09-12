const { Product } = require("../models/product");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router(); // we can use as a middleware
const mongoose = require("mongoose");
const multer = require("multer");
mongoose.set("useFindAndModify", false); // by default, we need to set it to false.

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-"); // random file name
    const extension = FILE_TYPE_MAP[file.mimetype]; //png,jpeg,jpg
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get("/", async (req, res) => {
  //localhost:3000/api/v1/products?categories=2345236,59654
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const productList = await Product.find(filter).populate("category"); // datanın gelmesini bekleyecek await sayesinde, select sayesinde istediğin featureları alabilirsin.
  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.post("/", async (req, res) => {
  try {
    const categoryById = await Category.findById(req.body.category);
    if (!categoryById) return res.status(400).send("Invalid Category !");
  } catch (err) {
    return res.status(500).send({ success: false, error: err });
  }

  const {
    name,
    description,
    richDescription,
    image,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isPopular,
  } = req.body;

  // const file = req.file;
  // if (!file) return res.status(400).send("No image in the request !");
  // const fileName = file.filename; //image-232323
  // const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`; //http://localhost:3000/public/upload
  let product = new Product({
    name,
    description,
    richDescription,
    image,
    // image: `${basePath}${fileName}`, //http://localhost:3000/public/upload/image-232323
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isPopular,
  });

  product = await product.save();
  if (!product) return res.status(400).send("The product cannot be created !");

  res.send(product);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(500).send("Invalid Product Id");

  const categoryById = await Category.findById(req.body.category);
  if (!categoryById) return res.status(400).send("Invalid Category !");

  const {
    name,
    description,
    richDescription,
    image,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isPopular,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(400).send("Invalid Product !");

  // const file = req.file;
  // let imagePath;

  // if (file) {
  //   const fileName = file.filename; //image-232323
  //   const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  //   imagePath = `${basePath}${fileName}`;
  // } else {
  //   imagePath = product.image;
  // }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      richDescription,
      image: image,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isPopular,
    },
    { new: true }
  ).catch((err) => {
    return res.status(400).send({ success: false, error: err });
  }); // I want to return new updated data.
  if (!updatedProduct)
    return res.status(404).send("the product cannot be updated!");

  res.send(updatedProduct);
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the product not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.get("/get/count", async (req, res) => {
  const productCount = await Product.countDocuments((count) => count);
  if (!productCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    productCount,
  });
});

router.get("/get/popular/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const popularProducts = await Product.find({ isPopular: true }).limit(+count);

  if (!popularProducts) {
    res.status(500).json({ success: false });
  }
  res.send(popularProducts);
});

//upload multiple images
router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(500).send("Invalid Product Id");

    const files = req.files;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    let imagesPaths = [];

    if (files) {
      files.forEach((file) => {
        imagesPaths.push(`${basePath}${file.filename}`);
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      { new: true }
    );

    if (!product)
      return res.status(400).send("The product cannot be updated !");

    res.send(product);
  }
);

module.exports = router;
