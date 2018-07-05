const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const {User} = require('./user');
const jwt = require("jsonwebtoken");

const UserController = {
    register : function(req, res) {
        var newUser = User.build(req.body);
        newUser.password = bcrypt.hashSync(req.body.password, 10);
        newUser.save().then((user) => {
                user.password = undefined;
                return res.json(user);
            }).catch(function(err) {
                console.log(err, req.body);
                return res.status(500).send({ message: err });
            });
    },
    signin : function(req, res) {

        let username = req.body.username;
        let password = req.body.password;

        User.findOne({
            username: req.body.username
          }).then((user) => {
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed. User not found.' });
              } else if (user) {
                if (!user.comparePasswords(req.body.password)) {
                  return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
                } else {
                  res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, username: user.username, id: user.id }, 'RESTFULAPIs')});
                }
              }
          }).catch(function(err) {
            console.log(err, req.body);
            res.status(400).send({ message: err });
        });
    },
    loginRequired : function(req, res, next) {
        if (req.user) {
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized user!' });
        }
    },
    signout : function(req, res, next) {
        console.log("No need to sign out. It will handle on client side.");
    }
}

module.exports = {UserController};//bunu kulanirken var {User} = require('/../../user'); gibi kullanmalisin