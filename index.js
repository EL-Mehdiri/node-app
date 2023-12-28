const express = require('express');
const mongoose = require("mongoose");
const app = express();

app.use(express.json())
// routes
app.use("/product", require("./routes/productRoutes"))
app.use("/user", require("./routes/userRoutes"))

// database



