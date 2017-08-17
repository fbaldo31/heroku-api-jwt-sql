const UserService = require('../services/user.service');
const logger = require('../services/logger.service').log();

/**
 * User Routes
 * @Route /api/users
 * @param app
 */
module.exports = function UserRoutes(app) {
    function sendResponseCollection(res, data) {
        if (data) {
            logger.info('Result:', data);
            res.status(200).json(data);
        } else {
            res.status(200).send({message: 'ok'});
        }
    }

    function sendError(err, res) {
        if (err) {
            res.send(err);
        } else {
            res.status(500).send('Unknown server error');
        }
    }

    function getAllUsers() {
        return UserService.getAllUsers()
            .then(function(users) { sendResponseCollection(res, users)})
            .catch(function(error) { sendError(error, res)});
    }

    // Get users
    app.get('/api/users', function(req, res, next) {
        getAllUsers(req, res);
    });

    // Update user
    app.put('/api/users/:user_id', function(req, res, next) {
        const user = UserService.getOneById(req.params.user_id);
        console.log(req.body);
        if (req.body.name) { user.name = req.body.name; }
        if (req.body.firstname) { user.firstName = req.body.firstname; }
        if (req.body.lastname) { user.lastName = req.body.lastname; }
        if (req.body.email) { user.email = req.body.email; }
        if (req.body.password) { user.password = req.body.password; }
        if (req.body.avatar) { user.avatar = req.body.avatar; }
        user.updatedAt = new Date();
        // if (req.body.skills) { user.skills = req.body.skills; }

        return UserService.update(req.params.id, user)
            .then(function(nbAffectedRows) { getAllUsers(req, res)})
            .catch(function(error) { sendError(error, res)});
    });

    // delete user
    app.delete('/api/users/:user_id', function(req, res, next) {
        return UserService.deleteOneById(req.params.id)
            .then(function(user) { getAllUsers(req, res)})
            .catch(function(error) { sendError(error, res)});
    });

    // avatar upload
    app.post('/api/upload', function(req, res, next) {
        // this.helper.uploadOneImage(req, res, function (uploadError) {
            //     this.helper.createFolderIfNotExist(res, this.helper.publicImagesPath);
            //     if (uploadError) {
            //         this.logger.error('error', uploadError);
            //         return res.status(500).json({message: req.uploadError, uploadError});
            //     } else {
            //         logger.info('uploaded', req.file);
            //         return res.json(req.file);
            //     }
            // });
    });
};
