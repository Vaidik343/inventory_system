const { Users, Permission, Roles } = require("../models");
const bcrypt = require("bcryptjs");
const resolvePermissions = require("../utils/resolvePermissions");


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
 console.log("🚀 ~ createUser ~ req.body:", req.body)
  try {
    const exists = await Users.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 🔧 Convert role name to role ID if needed
// 🔧 Better Role Lookup: Try ID first, then Name
    let roleId = role;
    if (role) {
      let roleDoc = await Roles.findById(role).catch(() => null);
      if (!roleDoc) {
        roleDoc = await Roles.findOne({ name: role });
      }
      if (!roleDoc) {
        return res.status(400).json({ 
          message: `Role "${role}" not found. Use a valid Role ID or Name.` 
        });
      }
      roleId = roleDoc._id;
    }
    const user = await Users.create({
      role: roleId,  // Use the role ID
      email,
      password,
      isActive,
      last_login,
    });
    console.log("🚀 ~ createUser ~ user:", user)

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



const updateUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const updateData = {};
    const { role, email, password, isActive, last_login } = req.body;

    // 🔧 Convert role name to role ID if needed
    // 🔧 Better Role Lookup: Try ID first, then Name
    if (role !== undefined) {
      let roleDoc = await Roles.findById(role).catch(() => null);

      if (!roleDoc) {
        roleDoc = await Roles.findOne({ name: role });
      }

      if (!roleDoc) {
        return res.status(400).json({ 
          message: `Role "${role}" not found. Use a valid Role ID or Name.` 
        });
      }
      updateData.role = roleDoc._id;
    }
    
    if (email !== undefined) updateData.email = email;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (last_login !== undefined) updateData.last_login = last_login;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await Users.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.log("🚀 ~ updateUser ~ error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req,res) => {
     const userId = req.params.id;
    try {
        const user = await Users.findByIdAndUpdate(
            userId,
         {isActive: false},
            {new: true}
        )

        if (!user) {
  return res.status(404).json({ message: "User not found" });
}

         res.status(200).json(user);
    } catch (error) {
        console.log("🚀 ~ deleteUser ~ error:", error)
        
        res.status(500).json({message:"Internal server error"});
    }
}

const grantPermission = async (req, res) => {
  const userId = req.params.id;
  const { resource, action } = req.body;

  try {
    const user = await Users.findById(userId);
    if(!user) return res.status(404).json({message: "User not found"});

    user.extraPermissions.push({resource, action});
    await user.save();
    
    res.json({message:"Permission granted successfully"});
  } catch (error) {
    console.log("🚀 ~ grantPermission ~ error:", error)
    res.status(500).json({message:"Internal server error"});
  }
}

const revokePermission = async (req, res) => {
  const userId = req.params.id;
  const { resource, action } = req.body;

  try {
    const user = await Users.findById(userId);
    if(!user) return res.status(404).json({message: "User not found"});

    user.revokedPermissions.push({resource, action});
    await user.save();
    res.status(200).json({message:"Permission revoke successfully"})
  } catch (error) {
    console.log("🚀 ~ revokePermission ~ error:", error);
     res.status(500).json({message:"Internal server error"});
    
  }
}

const getMyPermission = async (req, res) => {
 try {
    const user = await Users.findById(req.user.id).populate({
      path: "role",
      populate: {
        path: "permissions",
        select: "resource action",
      },
    });
    console.log("🚀 ~ getMyPermission ~ user:", user)
    if (!user) return res.status(404).json({ message: "User not found" });

    const perms = resolvePermissions(user);

    res.json({
      permissions: {
        role: user.role?.permissions || [],
        extra: user.extraPermissions || [],
        revoked: user.revokedPermissions || [],
      },
    });
  } catch (error) {
    console.log("🚀 ~ getMyPermissions ~ error:", error);
    res.status(500).json({ message: "Internal server error" });
  }

}
module.exports.userController = {getUser,createUser, updateUser,deleteUser, getMyPermission , revokePermission , grantPermission}   