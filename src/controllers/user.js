const {Users} = require("../models")
const bcrypt = require("bcryptjs");


const getUser = async (req,res) => {

    try {
      const users = await Users.find();
          console.log("🚀 ~ getUser ~ user:", users)

           if(!users)
        {
            return res.status(404).json({message:"Not found"})
        }
           res.status(200).json(users)
          
    } catch (error) {
        console.log("🚀 ~ getUser ~ error:", error)
         res.status(500).json({message:"Internal server error"});
        
    }

}

const createUser = async (req, res) => {
  const { role, email, password, isActive, last_login } = req.body;

  try {
    const exists = await Users.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await Users.create({
      role,
      email,
      password, // ⬅️ plaintext, model hashes it
      isActive,
      last_login,
    });

    res.status(201).json({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("🚀 ~ createUser ~ error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const updateUser = async (req,res) => {
    const userId = req.params.id;
    const { role, email, password, isActive, last_login } = req.body;
    try {
        if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
        const user = await Users.findByIdAndUpdate(
            userId,
            {role, email, password, isActive, last_login},
             { new: true }
        )

         res.status(200).json(user);
    } catch (error) {
        console.log("🚀 ~ updateUser ~ error:", error)
        res.status(500).json({message:"Internal server error"});
    }
}
const deleteUser = async (req,res) => {
     const userId = req.params.id;
    try {
        const user = await Users.findByIdAndUpdate(
            userId,
         {isActive: false},
            {new: true}
        )

         res.status(200).json(user);
    } catch (error) {
        console.log("🚀 ~ deleteUser ~ error:", error)
        
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports.userController = {getUser,createUser, updateUser,deleteUser} 