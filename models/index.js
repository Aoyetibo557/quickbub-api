'use strict';
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: dbConfig.PORT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize.authenticate().then(function(success){
  console.log("Sucessfully Connected to the database!");
}).catch((err) => {
  console.log("Database Connection error: ", err)
})
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// These are the database connections
db.tutorials = require("./tutorial.js")(sequelize, Sequelize);
db.users = require("./users.js")(sequelize, Sequelize);
db.jobs = require("./jobs.js")(sequelize, Sequelize);



module.exports = db;