const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler")
const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader && authHeader.startsWith("Bearer")) {
        try {
            token = authHeader.split(" ")[1];
            jwt.verify(token, "ewa1234", (err, decoded) => {
                if (err) return res.send("Not authorized")
                req.user = decoded.user;
                next()

            })
        } catch (error) {
            return res.status(401).json({ msg: "No Token Provided" })

        }
    } else {
        return res.status(401).json({ msg: "Please provide a valid authorization header with Bearer + your token" })
    }
})

module.exports = validateToken