'use strict';

const sequelize = require('./sequelize.service').connect();
// const logger = require('./logger.service');
const User = require('../models/user');
/**
 * Sequelize db server config connection
 * @Class DatabaseService
 * @author Frederick BALDO
 * @Date 30/06/2017.
 */
const DatabaseService = {
    models: [],
    init: function() {
        return new Promise(function(resolve, reject) {
            if (!sequelize) {
                console.error('Database environnement var not found');
                reject({message: 'Database environnement var not found'});
            } else {
                sequelize.authenticate().then( function() {
                    const config = sequelize.connectionManager.config;
                    console.log('sequelize-heroku: Connected to '+config.host+' as '+config.username+'.');
                    resolve(true);
                }).catch( function(err) {
                    const config = sequelize.connectionManager.config;
                    console.log('Sequelize: Error connecting '+config.host+' as '+config.user+': '+err);
                    reject({message: 'Sequelize: Error connecting '+config.host+' as '+config.user+': '+err})
                });
            }
        });
    },
    /**
     * Create the tables if not exists
     * Set models in ORM cache and create the tables if not exists
     */
    defineModels: function () {
        this.models.push(sequelize.define('user', User));

        for (let model of this.models) {
            this.register(model);
            console.log('Tables ', model.name, ' found.');
        }
    },
    register: function(model) {
        model.sync({alter: true}); // force: true to drop the tables before
    },
    /**
     * Tables relations
     */
    makeRelations: function() {
        if (User) {
            // User.hasOne(Role);
        }
    },
    getOrm: function () {
        return sequelize;
    },
    getModels: function () {
        return this.models;
    }
};

module.exports = DatabaseService;