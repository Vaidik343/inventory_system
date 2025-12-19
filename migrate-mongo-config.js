require("dotenv").config();

module.exports = {
  mongodb: {
    url: process.env.DB_URL,

    databaseName: "inventory",

  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog",

  migrationFileExtension: ".js" ,
  moduleSystem: "commonjs",
};
