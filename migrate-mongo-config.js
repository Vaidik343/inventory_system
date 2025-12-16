require("dotenv").config();

module.exports = {
  mongodb: {
    url: process.env.DB_URL,

    databaseName: "inventory_db",

  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog",

  migrationFileExtension: ".js" ,
  moduleSystem: "commonjs",
};
