const Sequelize = require('sequelize');
const environment = require('../environment');


const db = new Sequelize(environment.config.DB_URL);

module.exports = db;
