const dbManager = require('../services/database.service');
const Sequelize = require('sequelize');

/**
 * Created by Frederick BALDO on 27/06/2017.
 */
const Token = {
    createdAt: {type: Sequelize.DATE},
    value: {type: Sequelize.STRING, allowNull: false},
    validUntill: {type: Sequelize.DATE, allowNull: false},
    userId: {type: Sequelize.STRING, allowNull: false},
    role: {type: Sequelize.STRING}
};

module.exports = User;