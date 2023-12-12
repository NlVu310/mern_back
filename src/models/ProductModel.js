const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: false },
        type: { type: String, required: false },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: false },
        rating: { type: Number, required: false },
        description: { type: String },
        selled: { type: Number },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;