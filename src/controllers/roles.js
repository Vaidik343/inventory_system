const { Roles, Permission } = require("../models")

// ─────────────────────────────────────────
const createRole = async (req, res) => {
  const { name, permissions } = req.body;
  try {
    // ✅ Validate permission IDs if provided
    if (permissions && permissions.length > 0) {
      const foundPermissions = await Permission.find({
        _id: { $in: permissions }
      });

      if (foundPermissions.length !== permissions.length) {
        return res.status(400).json({ message: "One or more invalid permission IDs" });
      }
    }

    const role = await Roles.create({
      name,
      permissions: permissions || []  // ✅ store permission IDs
    });

    // ✅ populate so response shows full permission objects
    await role.populate("permissions");

    res.status(201).json(role);
  } catch (error) {
    console.log("🚀 ~ createRole ~ error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ─────────────────────────────────────────
const getRoles = async (req, res) => {
  try {
    const roles = await Roles.find()
      .populate("permissions"); // ✅ populate permission details

    if (!roles || roles.length === 0) {
      return res.status(404).json({ message: "No roles found" })
    }

    res.status(200).json(roles)
  } catch (error) {
    console.log("🚀 ~ getRoles ~ error:", error)
    res.status(500).json({ message: "Internal server error" });
  }
}

// ─────────────────────────────────────────
const updateRoles = async (req, res) => {
  const roleId = req.params.id;
  const { name, permissions } = req.body;

  try {
    // ✅ Validate permission IDs if being updated
    if (permissions && permissions.length > 0) {
      const foundPermissions = await Permission.find({
        _id: { $in: permissions }
      });

      if (foundPermissions.length !== permissions.length) {
        return res.status(400).json({ message: "One or more invalid permission IDs" });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (permissions !== undefined) updateData.permissions = permissions;

    const role = await Roles.findByIdAndUpdate(
      roleId,
      updateData,
      { new: true }
    ).populate("permissions"); // ✅ populate in same query

    if (!role) {
      return res.status(404).json({ message: "Role not found" })
    }

    // ✅ removed role.save() — findByIdAndUpdate already saves
    res.status(200).json(role)

  } catch (error) {
    console.log("🚀 ~ updateRoles ~ error:", error)
    res.status(500).json({ message: "Internal server error" });
  }
}

// ─────────────────────────────────────────
const deleteRoles = async (req, res) => {
  const roleId = req.params.id;
  try {
    const role = await Roles.findByIdAndDelete(roleId)

    if (!role) {
      return res.status(404).json({ message: "Role not found" }) // ✅ added check
    }

    res.status(200).json({ message: "Role deleted successfully" })
  } catch (error) {
    console.log("🚀 ~ deleteRoles ~ error:", error)
    res.status(500).json({ message: "Internal server error" });
  }
}

// ─────────────────────────────────────────
const roleOnly = (roleName) => {
  return (req, res, next) => {
    if (req.user.role.name !== roleName) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports.rolesController = {
  createRole,
  getRoles,
  updateRoles,
  deleteRoles,
  roleOnly
}