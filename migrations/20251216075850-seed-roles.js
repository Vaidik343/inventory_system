const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(db) {
    await db.collection("roles").insertMany([
      {
        _id: uuidv4(),
        name: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: uuidv4(),
        name: "manager",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: uuidv4(),
        name: "staff",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(db) {
    await db.collection("roles").deleteMany({
      name: { $in: ["admin", "manager", "staff"] },
    });
  },
};
