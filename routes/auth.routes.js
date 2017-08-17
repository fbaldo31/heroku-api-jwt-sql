'use strict';

const UserService = require('../services/user.service');
const AuthService = require('../services/auth.service');
const logger = require('../services/logger.service').log();

module.exports = function (app) {

    // Authentication
    app.post('/login', function(req, res) {
        const user = AuthService.checkCredentials(req);
        if (user) {
            UserService.login(user.name, user.password).then(function(user) {
                // Login match
                res.json({
                    id_token: AuthService.createIdToken(user),
                    access_token: AuthService.createAccessToken()
                });
            }).catch(function(error) {
                console.error(error);
                res.status(401).json({message:'Login failed, please check your credentials.'});
            });
        } else {
          console.error({message: 'Miss name or password'});
          res.status(401).json({message:'Miss name or password'});
        }
    });

    // Registration
    app.post('/register', function(req, res) {
        if (req.body.name && req.body.password && req.body.email) {
              let errors = [];
              // @todo: Sure more verification must be done here !
              const newUser = {
                  name: req.body.name,
                  firstName: req.body.firstName || '',
                  lastName: req.body.lastName || '',
                  email: req.body.email,
                  password: req.body.password,
                  avatar: req.body.avatar || '',
                  role: 'standard'
              };
              if (!errors.length) {
                  UserService.create(newUser).then(function(user) {
                      if (user) {
                          // Register done
                          console.log('User:', user.name, 'created');

                          res.json({
                              id_token: AuthService.createIdToken(user),
                              access_token: AuthService.createAccessToken()
                          });
                    } else {
                        res.status(500).json({message: 'Invalid credentials.'})
                    }
                }).catch(function(error) {
                    logger.error(error);
                    res.status(401).json({message:'Register failed.'});
                });
              }
          }
        // @todo return better error
        res.status(401).json({message:'Register failed. You must provide at least a name, a password and an email.'});
    });
    // @todo use a private key provided by the client instead of jwtStrategyOptions.secretOrKey
    app.get('/api', function(req, res) {
        if (req.isAuthenticated()) {
            res.send('It worked! User id is: ' + req.user._id + '.');
        }
        if (req.isUnauthenticated()) {
            res.send(req.headers);
        }
    });

    app.get('/secretDebug',
      function(req, res, next){
        logger.info(req.get('Authorization'));
        next();
      }, function(req, res){
        res.json('debugging');
    });
};

