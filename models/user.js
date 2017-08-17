const dbManager = require('../services/database.service');
const Sequelize = require('sequelize');

/**
 * Created by Frederick BALDO on 27/06/2017.
 */
const User = {
    createdAt: {type: Sequelize.DATE},
    updatedAt: {type: Sequelize.DATE},
    deletedAt: {type: Sequelize.DATE},
    name: {type: Sequelize.STRING, allowNull: false},
    firstName: {type: Sequelize.STRING},
    lastName: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false},
    avatar: {type: Sequelize.STRING},    
    role: {type: Sequelize.STRING}
};

module.exports = User;