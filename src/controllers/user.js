const {Users} = require("../models")

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
    const {role, email, password, isActive, last_login} = req.body
    try {
        const user = await Users.create({role, email, password, isActive, last_login})
         res.status(200).json(user);

         
    } catch (error) {
        console.log("🚀 ~ createUser ~ error:", error)
         res.status(500).json({message:"Internal server error"});
    }

}

const updateUser = async (req,res) => {
    const userId = req.params.id;
    const { role, email, password, isActive, last_login } = req.body;
    try {
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
        const user = await Users.findByIdAndDelete(
            userId,
         
        )

         res.status(200).json(user);
    } catch (error) {
        console.log("🚀 ~ deleteUser ~ error:", error)
        
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports = {getUser,createUser, updateUser,deleteUser}