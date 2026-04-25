const { Permission } = require("../models");

const createPermission = async (req, res) => {
  const { resource, action, description } = req.body;

  if (!resource || !action) {
    return res.status(400).json({ message: "resource and action are required" });
  }

  try {
    // ✅ Check duplicate before creating for cleaner error message
    const existing = await Permission.findOne({ resource, action });
    if (existing) {
      return res.status(400).json({
        message: `Permission ${resource}.${action} already exists`
      });
    }

    const perm = await Permission.create({ resource, action, description });
    res.status(201).json(perm);
  } catch (error) {
    console.log("🚀 ~ createPermission ~ error:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// ─────────────────────────────────────────
const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find().sort({ resource: 1, action: 1 });

    if (!permissions || permissions.length === 0) {
      return res.status(404).json({ message: "No permissions found" });
    }

    res.status(200).json(permissions);
  } catch (error) {
    console.log("🚀 ~ getPermissions ~ error:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// ─────────────────────────────────────────
const getPermissionById = async (req, res) => {
  try {
    const perm = await Permission.findById(req.params.id);

    if (!perm) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.status(200).json(perm);
  } catch (error) {
    console.log("🚀 ~ getPermissionById ~ error:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// ─────────────────────────────────────────
const updatePermission = async (req, res) => {
  const { resource, action, description } = req.body;
  const permissionId = req.params.id;

  try {
    // ✅ Check duplicate on update — different ID same resource+action
    if (resource && action) {
      const existing = await Permission.findOne({
        resource,
        action,
        _id: { $ne: permissionId }  // exclude current permission
      });

      if (existing) {
        return res.status(400).json({
          message: `Permission ${resource}.${action} already exists`
        });
      }
    }

    const perm = await Permission.findByIdAndUpdate(
      permissionId,
      { resource, action, description },
      { new: true }
    );

    if (!perm) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.status(200).json(perm);
  } catch (error) {
    console.log("🚀 ~ updatePermission ~ error:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// ─────────────────────────────────────────
const deletePermission = async (req, res) => {
  try {
    const perm = await Permission.findByIdAndDelete(req.params.id);

    if (!perm) {
      return res.status(404).json({ message: "Permission not found" });
    }

    // ✅ Return what was deleted for confirmation
    res.status(200).json({
      message: "Permission deleted successfully",
      deleted: perm
    });
  } catch (error) {
    console.log("🚀 ~ deletePermission ~ error:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports.permissionController = {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission
};