const AuthService = require('../services/auth.service');

module.exports = function (app) {
    // Index
    app.get('/', function(request, response) {
      response.render('pages/index');
    });

    // Api
    app.use('/api', AuthService.jwtCheck, AuthService.requireScope('full_access'));
};