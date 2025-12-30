const { Permission } = require("../models");

const createPermission = async (req, res) => {
  const { resource, action, description } = req.body;

  if (!resource || !action) {
    return res.status(400).json({ message: "resource and action are required" });
  }

  try {
    const perm = await Permission.create({ resource, action, description });
    res.status(201).json(perm);
  } catch (error) {
    console.log("🚀 ~ createPermission ~ error:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const updatePermission = async (req, res) => {
  const { resource, action, description } = req.body;
  const permissionId = req.params.id;

  try {
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

module.exports.permissionController = {
  createPermission,
  updatePermission,
};
