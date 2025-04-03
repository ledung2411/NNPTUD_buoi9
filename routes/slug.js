var express = require("express");
var router = express.Router();
let productModel = require("../schemas/product");
let categoryModel = require("../schemas/category");
var { CreateSuccessRes, CreateErrorRes } = require("../utils/ResHandler");

// Get all products in a category by category slug
router.get("/:categorySlug", async function (req, res, next) {
  try {
    // Find the category by slug
    const category = await categoryModel.findOne({
      slug: req.params.categorySlug,
    });

    if (!category) {
      return CreateErrorRes(res, 404, new Error("Category not found"));
    }

    // Find all products in this category that are not deleted
    const products = await productModel
      .find({
        category: category._id,
        isDeleted: false,
      })
      .populate("category");

    CreateSuccessRes(res, 200, {
      category: category,
      products: products,
    });
  } catch (error) {
    next(error);
  }
});

// Get specific product by category slug and product slug
router.get("/:categorySlug/:productSlug", async function (req, res, next) {
  try {
    // Find the category by slug
    const category = await categoryModel.findOne({
      slug: req.params.categorySlug,
    });

    if (!category) {
      return CreateErrorRes(res, 404, new Error("Category not found"));
    }

    // Find the specific product with matching category and slug
    const product = await productModel
      .findOne({
        category: category._id,
        slug: req.params.productSlug,
        isDeleted: false,
      })
      .populate("category");

    if (!product) {
      return CreateErrorRes(res, 404, new Error("Product not found"));
    }

    CreateSuccessRes(res, 200, product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
