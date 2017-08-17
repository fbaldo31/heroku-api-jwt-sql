const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const winston = require('winston');
const config = require('../config/options').logger;

// Create log file & folder if needed
config.file.filename = `${path.join(config.directory, '../logs')}/${config.file.filename}`;
mkdirp.sync(path.join(config.directory, '../logs'));
fs.open(config.file.filename, 'wx', function(err) {
    if (err) {
        if (err.code !== 'EEXISIT') {
            console.error(err.message);
        }
    }
    console.log('Create log file');
});

const logger = {
    log: function() {
        return new winston.Logger({
            transports: [
                new winston.transports.File({filename: config.file.filename}),
                new winston.transports.Console(config.console)
            ],
            exitOnError: false
        });
    },
    skip: function(req, res) {
        return res.statusCode >= 200;
    },
    stream: {
        write: function(message, encoding) {
            logger.info('Logger started');
            logger.info(message);
        }
    }
};
module.exports = logger;