const express = require("express");
const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { route } = require("./productRoutes");
const router = express.Router();

// register user
router.post("/register", async (req, res) => {
    const { email, username, password } = req.body;
    // check if the email and username are empty
    if (!username || !password || !email) return res.status(400).send({ msg: "Fill all inputs" });
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).send({ msg: "User already exists!" })
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username,
        email,
        password: hashPassword
    })
    res.status(201).send({ _id: newUser.id, username: newUser.username, email: newUser.email })
})

route.post("/", (req, e))
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Please enter all fields')
    const user = await User.findOne({ email })
    if (!user) return res.status(400).send('Invalid Email or Password')
    // conpare 
    if (user && (bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email
        }, "ewa1234", { expiresIn: "1h" })
        res.send({ accessToken })
    } else {
        return res.status(400).send('Invalid Email or Password!')
    }

})

module.exports = router