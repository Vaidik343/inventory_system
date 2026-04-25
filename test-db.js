const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_URL;
console.log("Testing connection to:", url);

mongoose.connect(url, {
    serverSelectionTimeoutMS: 10000,
})
.then(() => {
    console.log("Connection successful!");
    mongoose.connection.close();
})
.catch(err => {
    console.error("Connection failed:", err);
});
