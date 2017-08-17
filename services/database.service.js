'use strict';

/**
 * Sequelize db server config connection
 * @Class DatabaseService
 * @author Frederick BALDO
 * @Date 30/06/2017.
 */
class DatabaseService {    
    constructor() {
//        this.sequelize = require('sequelize-heroku').connect();
        this.sequelize = require('./sequelize.service').connect();
        this.models = [];
        this.init();
    }
    init() {        
        if (!this.sequelize) {
            console.error('Database environnement var not found');
            return;
        } else {
            this.sequelize.authenticate().then( () => {
                const config = sequelize.connectionManager.config;
                console.log('sequelize-heroku: Connected to '+config.host+' as '+config.username+'.');
                
                // Create the tables if not exists
                this.defineModels();
            }).catch( function(err) {
                const config = sequelize.connectionManager.config;
                console.log('Sequelize: Error connecting '+config.host+' as '+config.user+': '+err);
            });
        }
    }
    /**
     * Set models in ORM cache and create the tables if not exists
     */
    defineModels() {
        const User = require('../models/user');
        this.models.push(this.define('user', User));
        
        for (let model of this.models) {
            this.register(model);
            console.log('Tables ', model.name, ' found.');
        }
        
    }
    register(model) {
        model.sync({alter: true}); // force: true to drop the tables before
    }

    /** Tables relations */
    makeRelations() {
        if (User) {
            // User.hasOne(Role);
        }
    }
    define(name, model) {
        return this.sequelize.define(name, model);
    }
    
    getOrm() {
        return this.sequelize;
    }
    
    getModels() {
        return this.models;
    }
}

const dbManager = new DatabaseService();

module.exports = dbManager;