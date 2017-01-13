let user = require('../controllers/user.controller');

module.exports = (app) => {

    app.route('/users')
        .get(user.list);

    app.route('/users/:userID')
        .get(user.read);

    app.param('userID', user.getUserByID);
};
