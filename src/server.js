const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 7005;
const connectDB = require("./config/db")
const app = express();
const fs = require('fs')
const path = require('path')


app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.send("inventory system api")
})

const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath).forEach( (file) => {
    if(file.endsWith('Routes.js')) {

        const route = require(path.join(routesPath, file));

        //Validate that the file exports a router
        if(route && typeof route === 'function')
        {
            app.use('/api', route);
            console.log(`Loaded route: ${file}`);
        }
        else {
            console.warm(`skipped ${file}: not a valid router export`);
        }
    }    
});

connectDB();

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})