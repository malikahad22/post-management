// In this file you can configure migrate-mongo

const config = {
  mongodb: {
    url: "mongodb://localhost:27017",
    databaseName: "post-management",

    options: {

    }
  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  lockCollectionName: "changelog_lock",
  lockTtl: 0,
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',

};

module.exports = config;
