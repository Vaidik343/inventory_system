const resolvePermissions = require("../utils/resolvePermissions");

module.exports = (resource, action) => {
  return (req, res, next) => {
    const user = req.user;
    console.log("🚀 ~ user:", user)

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const perms = resolvePermissions(user);

    if (!perms.can(resource, action)) {
      return res.status(403).json({ message: "Forbidden" });
    }
console.log("PERMS CHECK:", req.user.role.permissions);

    next();
  };
};
