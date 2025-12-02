const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 7005;
const connectDB = require("./config/db")
const app = express();
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.send("inventory system api")
})



connectDB();

app.listen(PORT, () => {
    console.log(`server running on http://localhost:7005`)
})