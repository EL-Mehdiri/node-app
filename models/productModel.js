const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }
    },
    {
        timestamps: true
    }
)
const Product = mongoose.model("Product", productSchema);

module.exports = Product;