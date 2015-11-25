var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/banana-republic-app');

exports.save = function (req, res) {
    // Return if missing required data
    if (!req.body.email) {
        return res.sendStatus(400);
    }

    var users = db.get('users');

    users.insert({email: req.body.email}, function (err, doc) {
        if (err) {
            res.sendStatus(400);
            throw err;
        } else {
            res.sendStatus(200);
        }
    });
};