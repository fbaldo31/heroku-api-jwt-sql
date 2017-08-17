const md5 = require('md5');
/**
 * Created by Frederick BALDO on 12/08/2017.
 */
const db = require('./database.service').getOrm();
const logger = require('./logger.service').log();

const UserService = {
    create: function(user) {
        const models = require('./database.service').getModels();
        const User = models.find(function(v, i) {
            return v.name === 'user';
        });
        // Encrypt passwod
        user.password = md5(user.password);
        logger.info(`Create user ${user.name}`, user);
        // Save user
         return new Promise(function(resolve, reject) {
            return db.transaction(function(t) {
               return User.create(user).then(function(newUser) {
                    logger.info(`Created user with name ${newUser.name}.`);
                    resolve(newUser);
                }).catch(function(error) {
                    logger.error(error);
                    reject(error);
                });
            });
        });
    },

    getAllUsers: function() {
        const models = require('./database.service').getModels();
        const User = models.find(function(v, i) {
            return v.name === 'user';
        });
         return new Promise(function(resolve, reject) {
            db.transaction(function(t) {
                return User.findAll().then(function(users) {
                    logger.info("Get all users.");
                    resolve(users);
                }).catch(function(error) {
                    logger.error(error.message);
                    reject(error);
                });
            });
        });
    },

    getOneById: function(userId) {
        console.log('Search', userId)
        const models = require('./database.service').getModels();
        const User = models.find(function(v, i) {
            return v.name === 'user';
        });
         return new Promise(function(resolve, reject) {
            return db.transaction(function(t) {
                return User.findOne({where: {id: userId}}).then(function(product) {
                    if (product) {
                        logger.info(`Retrieved product with name ${userId}.`);
                    } else {
                        logger.info(`Product with name ${userId} does not exist.`);
                    }
                    resolve(product);
                }).catch(function(error) {
                    logger.error(error.message);
                    reject(error);
                });
            });
        });
    },

    login: function(name, pass) {
        const models = require('./database.service').getModels();
        const User = models.find(function(v, i) {
            return v.name === 'user';
        });
         return new Promise(function(resolve, reject) {
            console.log(name, md5(pass));
            return db.transaction(function(t) {
                return User.findOne({where: {name: name, password: md5(pass)}}).then(function(user) {
                    if (user) {
                        logger.info(`Retrieved user with name ${name}.`);
                    } else {
                        logger.info(`User with name ${name} does not exist.`);
                        reject(null);
                    }
                    resolve(user);
                }).catch(function(error) {
                    logger.error(error);
                    reject(error);
                });
            });
        });
    },

    update: function(userId, user) {
        const models = require('./database.service').getModels();
        const User = models.find(function(v, i) {
            return v.name === 'user';
        });
         return new Promise(function(resolve, reject) {
            db.transaction(function(t) {
                return User.update(user, {where: {id: userId}})
                    .then(function(results) {
                        if (results.length > 0) {
                            logger.info(`Updated ${userId}.`);
                        } else {
                            logger.info(`User with id ${userId} does not exist.`);
                        }
                        resolve(null);
                    }).catch(function(error) {
                        logger.error(error.message);
                        reject(error);
                    });
            });
        });
    },

    deleteOneById: function(userId) {
        const models = require('./database.service').getModels();
        const User = models.find(function(v, i) {
            return v.name === 'user';
        });
         return new Promise(function(resolve, reject) {
            db.transaction(function(t) {
                return User.destroy({where: {id: userId}}).then(function(affectedRows) {
                    if (affectedRows > 0) {
                        logger.info(`Deleted user with id ${userId}`);
                    } else {
                        logger.info(`User with id ${userId} does not exist.`);
                    }
                    resolve(null);
                }).catch(function(error) {
                    logger.error(error.message);
                    reject(error);
                });
            });
        });
    }
};

module.exports = UserService;