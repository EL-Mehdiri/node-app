const express = require("express")

const router = express.Router();
const Product = require("../models/productModel");
const validateToken = require("../middleware/validateToken");
router.use(validateToken)
// get products
router.get("/", async (req, res) => {
    const products = await Product.find({ user_id: req.user.id });
    res.send(products);
})
// create 
router.post("/", async (req, res) => {
    const { name, price } = req.body
    if (!name || !price) return res.status(400).send({ msg: "Fill all inputs!!" });
    const product = await Product.create({
        name,
        price,
        user_id: req.user.id
    });
    res.status(201).send(product);
})

// update 
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) return res.status(400).send({ msg: "Product not found" });
    // display product
    const updateProduct = await Product.findById(product);
    res.status(200).send(updateProduct);

    res.send({ message: "update method!" });
})
// delete 
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).send({ msg: "Product not found" });
    // display product
    res.status.apply(200).send(product);
})

module.exports = router;
