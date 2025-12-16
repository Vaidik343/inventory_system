const {Roles} = require("../models")

const createRole = async(req, res) => {
    const {name} = req.body;
    try {
        const role = await Roles.create({name});
        res.status(201).json(role)
    } catch (error) {
        console.log("🚀 ~ createRole ~ error:", error);
        res.status(500).json({message:"Internal server error"});
        
    }

}

const getRoles =async (req,res) => {
    try {
        const roles = await Roles.find();

        if(!roles)
        {
            return res.status(404).json({message:"Not found"})
        }

        res.status(200).json(roles)
    } catch (error) {
        console.log("🚀 ~ getRoles ~ error:", error)
         res.status(500).json({message:"Internal server error"});
    }

}

const updateRoles = async (req,res) => {
    const roleId = req.params.id;
     const {name} = req.body;
    try {
        const role = await Roles.findByIdAndUpdate(
            roleId,
            {name},
             { new: true }
        )

          if(!role)
        {
            return res.status(404).json({message:"Not found"})
        }
        res.status(200).json(role)
        role.save();
    } catch (error) {
       console.log("🚀 ~ updateRoles ~ error:", error)
       
         res.status(500).json({message:"Internal server error"});
        
    }
}
const deleteRoles = async (req,res) => {
    const roleId = req.params.id;
    try {
        const role = await Roles.findByIdAndDelete(roleId)
        res.status(200).json(role)
    } catch (error) {
        console.log("🚀 ~ deleteRoles ~ error:", error)
         res.status(500).json({message:"Internal server error"});
        
    }
}

const roleOnly = (roleName) => {
  return (req, res, next) => {
    if (req.user.role.name !== roleName) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};


module.exports.rolesController = {createRole,getRoles,updateRoles,deleteRoles, roleOnly }