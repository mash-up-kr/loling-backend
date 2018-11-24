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
        type: Sequelize.BIGINT,
    },
    // 조회수
    hits: {
        type: Sequelize.INTEGER,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});


module.exports = Bottle;
