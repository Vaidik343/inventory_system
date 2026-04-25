const resolvePermissions = require("../utils/resolvePermissions");

module.exports = (resource, action) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const perms = resolvePermissions(user);

    if (!perms.can(resource, action)) {
      return res.status(403).json({ 
        message: `Access denied: You do not have permission to ${action} ${resource}` 
      });
    }

    next();
  };
};
