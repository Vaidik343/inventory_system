const jwt = require("jsonwebtoken");
const {Users} = require("../models");

module.exports = async (req , res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token) 
        {
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await Users.findById(decoded.id).populate.populate("role");

        if(!user || !user.isActive)
        {
            return res.status(401).json({message:"User not active"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("🚀 ~ error:", error)
        res.status(401).json({ message: "Invalid token" });
    }
}