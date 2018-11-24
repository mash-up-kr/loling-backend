const Sequelize = require('sequelize');
const db = require('../db');


const Bottle = db.define('Bottle', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdTimestamp: {
        type: Sequelize.INTEGER,
    },
    // 조회수
    hits: {
        type: Sequelize.INTEGER,
    },
});


module.exports = Bottle;
