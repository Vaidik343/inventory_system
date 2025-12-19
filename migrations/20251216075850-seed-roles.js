const { v4: uuidv4 } = require("uuid");

// migrations/20251216074833-seed-roles.js
module.exports.up = async (db) => {
  await db.collection("roles").insertMany([
    {
      _id: "admin-role-id",
      name: "admin",
      permissions: ["*"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "manager-role-id",
      name: "manager",
      permissions: [
        "purchase:create",
        "stock:adjust",
        "report:view"
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "staff-role-id",
      name: "staff",
      permissions: [
        "sale:create",
        "sale:view",
        "product:view"
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
};

module.exports.down = async (db) => {
  await db.collection("roles").deleteMany({
    name: { $in: ["admin", "manager", "staff"] },
  });
};
