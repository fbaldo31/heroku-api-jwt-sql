'use strict';

const Sequelize = require('sequelize');

module.exports = {

    connect: function() {
        let userOptions, dbOptions, config;
        // Look for ClearDB MySQL Add-on
        if (process.env.CLEARDB_DATABASE_URL) {
            userOptions = process.env.CLEARDB_DATABASE_URL.split('@')[0].split('//')[1].split(':');
            dbOptions = process.env.CLEARDB_DATABASE_URL.split('@')[1].split('/');

            config = {
                user: process.env.DEV_MODE ? userOptions[0] : userOptions[0].split('@')[0],
                pass: userOptions[1],
                base: process.env.DEV_MODE ? dbOptions[1] : dbOptions[1].split('?reconnect=true')[0],
                options: {
                    dialect: 'mysql',
                    protocol: 'mysql',
                    host: dbOptions[0].split(':')[0],
                    port: dbOptions[0].split(':')[1],
                    logging: false,
                    dialectOptions: {
                        ssl: false
                    }
                }
            };
        }
        
        // Else, lookf for Heroky Postgresql
        else if (process.env.DATABASE_URL) {
            userOptions = process.env.DATABASE_URL.split('@')[0].split('//')[1].split(':');
            dbOptions = process.env.DATABASE_URL.split('@')[1].split('/');
            
            config = {
                user: userOptions[0],
                pass: userOptions[1],
                base: dbOptions[1],
                options: {
                    dialect: 'postgres',
                    protocol: 'postgres',
                    host: dbOptions[0].split(':')[0],
                    port: dbOptions[0].split(':')[1],
                    logging: false,
                    dialectOptions: {
                        ssl: true
                    }
                }
            };
        }
        
        if (typeof config !== 'undefined') {
            return new Sequelize(config.base, config.user, config.pass, config.options);
        }
        
        return false;
    }
};
