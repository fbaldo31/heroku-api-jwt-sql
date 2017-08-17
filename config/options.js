const ExtractJwt = require('passport-jwt').ExtractJwt;

const now = new Date().getYear() + '_' + new Date().getMonth().toLocaleString() + '_' + new Date().getDate().toLocaleString();

const Options = {
     /*
        fromHeader(header_name) Looks for the JWT in the given http header
        fromBodyField(field_name) Looks for the JWT in the given body field. You must have a body parser configured in order to use this method.
        fromUrlQueryParameter(param_name) Looks for the JWT in the given URL query parameter.
        fromAuthHeaderWithScheme(auth_scheme) Looks for the JWT in the authorization header, expecting the scheme to match auth_scheme.
        fromAuthHeader() Looks for the JWT in the authorization header with the scheme 'JWT'
        fromExtractors([array of extractor functions]) Using an array of extractors provided. Each extractor is attempted in order until one returns a token.
         */
    jwtStrategy: {
        // jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
        audience: 'client_id',
        issuer: '',
        secret: 'client_secret'
    },

    /**
     * Config used by winston
     */
    logger: {
        file: {
            level: 'info',
            filename: now + '_server.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 100,
            colorize: false
        },
        console: {
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true
        },
        directory: __dirname
    }
};
module.exports = Options;