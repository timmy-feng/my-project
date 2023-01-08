const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const debug = require('debug')('server:server');

const privateKey = 'shhhhh';

exports.user_login = ({body: {username, password}}, res, next) => {
    User.find({username}, async (err, users) => {
        if (err) {
            return next(err);
        }

        if (users.length == 0) {
            throw new Error('User not found');
        }

        const user = users[0];
        const matches = await bcrypt.compare(password, user.password);
        if (!matches) {
            throw new Error('Incorrect password');
        }

        res.json(
            jwt.sign({username, userId: user._id}, privateKey)
        );
    });
};

exports.user_register = ({body: {username, password}}, res, next) => {
    User.find({username}, (err, users) => {
        if (err) {
            next(err);
        }

        if (users.length == 1) {
            throw new Error('Username taken');
        }

        bcrypt.hash(password, 10).then((hash) => {
            const user = new User({
                username,
                password: hash,
            });

            user.save((err) => {
                if (err) {
                    next(err);
                }

                next();
            });
        })
    });
};

exports.user_verify = (req, res, next) => {
    if (!req.query.token) {
        throw new Error('No token provided');
    }

    jwt.verify(req.query.token, privateKey, (err, decoded) => {
        if (err) {
            throw new Error('Invalid token');
        }

        req.username = decoded.username;
        req.userId = decoded.userId;
        next();
    });
};

exports.username_get = (req, res, next) => {
    res.json(req.username);
}