module.exports = (requiredPermission) => {

    return (req, res, next) => {
        const user = req.user;

        if(!user || !user.role)
        {
            return res.status(403).json({message: "Access denied!"});

        }

     if (
  user.role.permissions.includes("*") ||
  user.role.permissions.includes(requiredPermission)
) {
  return next();
}


        return res.status(403).json({
            message: "You do not have permission"
        });
    };

};