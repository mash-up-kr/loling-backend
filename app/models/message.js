const Sequelize = require('sequelize');
const db = require('../db');


const Message = db.define('Message', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bottleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    latitude: {
        type: Sequelize.DOUBLE,
    },
    longitude: {
        type: Sequelize.DOUBLE,
    },
    country: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    weather: {
        type: Sequelize.INTEGER, // 날씨 코드.
    },
    content: {
        type: Sequelize.STRING,
    },
    createdTimestamp: {
        type: Sequelize.INTEGER,
    },
});


module.exports = Message;
