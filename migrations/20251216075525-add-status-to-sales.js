module.exports.up = async (db) => {
  await db.collection("sales").updateMany(
    { status: { $exists: false } },
    { $set: { status: "active" } }
  );
};

module.exports.down = async (db) => {
  await db.collection("sales").updateMany(
    {},
    { $unset: { status: "" } }
  );
};
