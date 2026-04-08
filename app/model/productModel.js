const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    brand: {
      type: String,
    },
    name: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    category: {
      type: String,
      enum: {
        values: ["men", "women", "unisex"],
        message: "Category must be either men, women, or unisex",
      },
    },
    price: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    currency: {
      type: String,
      default: "INR",
    },
    variants: [
      {
        size: {
          type: String,
        },
        color: {
          type: String,
        },
        stock: {
          type: Number,
          default: 0,
        },
        price: {
          type: Number,
        },
      },
    ],
    images: {
      type: String,
    },
    desc: {
      type: String,
    },
    shortDesc: {
      type: String,
    },
    tags: {
      type: String,
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "active", "archived"],
        message: "Status must be either draft, active, or archived",
      },
    },
    ratings: {
      type: Number,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const productModel = mongoose.model("product", ProductSchema);

module.exports = productModel;
