const express = require('express');
const mongoose = require("mongoose");
const app = express();

app.use(express.json())
// routes
app.use("/product", require("./routes/productRoutes"))
app.use("/user", require("./routes/userRoutes"))

// database
mongoose.connect("mongodb+srv://admin:pGDQsHUMz8bZ0a2L@cluster0.fdok1sn.mongodb.net/CrudApp")
    .then(() => {
        console.log("connected to database!");
        app.listen(8000, () => { console.log("server running on port 8000") });
    }).catch((err) => {
        console.error(err);
    })


