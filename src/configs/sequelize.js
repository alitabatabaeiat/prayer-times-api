module.exports = {
  development: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
      useUTC: true,
    },
    define: {
      underscored: true,
      freezeTableName: false,
    },
  },
  test: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
      useUTC: true,
    },
    define: {
      underscored: true,
      freezeTableName: true,
    },
  },
  production: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
      useUTC: true,
    },
    define: {
      underscored: true,
      freezeTableName: true,
    },
  },
};
