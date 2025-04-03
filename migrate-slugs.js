const mongoose = require("mongoose");
const slugify = require("slugify");
const categoryModel = require("./schemas/category");
const productModel = require("./schemas/product");

async function migrateData() {
  try {
    // Connect to your MongoDB
    await mongoose.connect("your_mongodb_connection_string", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to database");

    // Update all categories with slugs
    const categories = await categoryModel.find({ slug: { $exists: false } });
    console.log(`Found ${categories.length} categories without slugs`);

    for (const category of categories) {
      category.slug = slugify(category.name, { lower: true, strict: true });
      await category.save();
      console.log(
        `Updated category: ${category.name} with slug: ${category.slug}`
      );
    }

    // Update all products with slugs
    const products = await productModel.find({ slug: { $exists: false } });
    console.log(`Found ${products.length} products without slugs`);

    for (const product of products) {
      product.slug = slugify(product.name, { lower: true, strict: true });
      await product.save();
      console.log(
        `Updated product: ${product.name} with slug: ${product.slug}`
      );
    }

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from database");
  }
}

migrateData();
