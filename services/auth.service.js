'use strict';

const check = require('express-jwt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const jwtOptions = require('../config/options').jwtStrategy;

const AuthService = {
    jwtCheck: check(jwtOptions),
    requireScope: function(scope) {
        return function (req, res, next) {
            const has_scopes = req.user.scope === scope;
            if (!has_scopes) {
                res.sendStatus(401);
                return;
            }
            next();
        };
    },
    createIdToken: function(user) {
        return jwt.sign(_.omit(user, 'password'), jwtOptions.secret, { expiresIn: 60*60*5 });
    },

    createAccessToken: function() {
        const _this = this;
        return jwt.sign({
            iss: jwtOptions.issuer,
            aud: jwtOptions.audience,
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            scope: 'full_access',
            sub: "lalaland|gonto",
            jti: _this.genJti(), // unique identifier for the token
            alg: 'HS256'
        }, jwtOptions.secret);
    },

    genJti: function() {
        let jti = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 16; i++) {
            jti += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return jti;
    },

    checkCredentials: function(req) {
        const user = {name: req.body.name, password: req.body.password};
        if (!req.body.name) {
            logger.error({message: 'Authentication error: No name provided.'});
            return false;
        }
        if (!req.body.password) {
            logger.error({message: 'Authentication error: No password provided.'});
            return false;
        }
        if (req.body.name && req.body.password) {
            // @todo More verfications !
            return user;
        }
    }
};

module.exports = AuthService;