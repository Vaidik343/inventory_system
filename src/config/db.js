const mongoose = require('mongoose');
 const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_URL

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url);
        // console.log("🚀 ~ connectDB ~ conn:", conn)
        console.log("Database connected!!")
        
    } catch (error) {
        console.log("🚀 ~ connectDB ~ error:", error)
         process.exit(1);
        
    }

}

module.exports = connectDB;