let mongoose = require("mongoose");
let slugify = require("slugify");

let productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    imgURL: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate slug from name
productSchema.pre("save", function (next) {
  // Only generate slug if name is modified or new document
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name, {
      lower: true, // Convert to lowercase
      strict: true, // Remove special characters
    });
  }
  next();
});

module.exports = mongoose.model("product", productSchema);
