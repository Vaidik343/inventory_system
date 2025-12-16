module.exports.up = async (db) => {
  await db.collection("roles").insertMany([
    {
      _id: "admin-role-id",
      name: "admin",
      permissions: ["*"]
    },
    {
      _id: "manager-role-id",
      name: "manager",
      permissions: [
        "purchase:create",
        "stock:adjust",
        "report:view"
      ]
    },
    {
      _id: "staff-role-id",
      name: "staff",
      permissions: [
        "sale:create",
        "sale:view",
        "product:view"
      ]
    }
  ]);
};

module.exports.down = async (db) => {
  await db.collection("roles").deleteMany({
    name: { $in: ["admin", "manager", "staff"] }
  });
};
