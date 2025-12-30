module.exports.up = async (db) => {
  await db.collection("roles").insertMany([
    {
      _id: "admin-role-id",
      name: "admin",
      permissions: [{ resource: "*", action: "*" }],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "manager-role-id",
      name: "manager",
      permissions: [
        { resource: "purchase", action: "create" },
        { resource: "stock", action: "adjust" },
        { resource: "report", action: "view" }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "staff-role-id",
      name: "staff",
      permissions: [
        { resource: "sale", action: "create" },
        { resource: "sale", action: "view" },
        { resource: "product", action: "view" }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
};

module.exports.down = async (db) => {
  await db.collection("roles").deleteMany({
    _id: { $in: ["admin-role-id", "manager-role-id", "staff-role-id"] }
  });
};
