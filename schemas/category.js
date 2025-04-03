let mongoose = require("mongoose");
let slugify = require("slugify");

let categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      default: "",
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
categorySchema.pre("save", function (next) {
  // Only generate slug if name is modified or new document
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name, {
      lower: true, // Convert to lowercase
      strict: true, // Remove special characters
    });
  }
  next();
});

module.exports = mongoose.model("category", categorySchema);
