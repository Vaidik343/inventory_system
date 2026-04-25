const mongoose = require('mongoose');
 const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_URL


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url, {
            serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferCommands: false, // Disable mongoose buffering
            family: 4 // Force IPv4
        });
        console.log("🚀 ~ connectDB ~ conn:", conn)
        console.log("Database connected!!")

    } catch (error) {
        console.log("🚀 ~ connectDB ~ error:", error)
         process.exit(1);

    }

}

module.exports = connectDB;