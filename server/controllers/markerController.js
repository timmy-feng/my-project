const Marker = require("../models/marker");

const debug = require('debug')('server:server');

exports.marker_listing_get = (req, res, next) => {
    Marker.find({author: req.userId}, (err, result) => {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
};

exports.marker_get = (req, res, next) => {
    Marker.findOne({_id: req.params.id, author: req.userId}, (err, result) => {
        if (err) {
            return next(err);
        }
        if (!result) {
            const err = new Error('Pin not found');
            err.status = 404;
            return next(err);
        }
        res.json(result);
    });
};

exports.marker_create_post = (req, res, next) => {
    const pin = new Marker({
        lat: req.body.lat,
        lng: req.body.lng,
        title: req.body.title,
        contents: req.body.contents,
        pinType: req.body.pinType,
        tags: req.body.tags,
        author: req.userId,
    });

    pin.save((err, newPin) => {
        if (err) {
            debug(err);
            return next(err);
        }
        res.json(newPin);
    });
};

exports.marker_update_post = (req, res, next) => {
    const update = {
        lat: req.body.lat,
        lng: req.body.lng,
        title: req.body.title,
        contents: req.body.contents,
        pinType: req.body.pinType,
        tags: req.body.tags,
    };

    Marker.findOneAndUpdate({_id: req.params.id, author: req.userId}, update, (err, pin) => {
        if (err) {
            return next(err);
        }
        if (!pin) {
            const err = new Error('Pin not found');
            err.status = 404;
            return next(err);
        }
        res.json(pin);
    });
}

exports.marker_delete_post = (req, res, next) => {
    Marker.findOneAndRemove({_id: req.params.id, author: req.userId}, (err, pin) => {
        if (err) {
            return next(err);
        }
        if (!pin) {
            const err = new Error('Pin not found');
            err.status = 404;
            return next(err);
        }
        res.json(pin);
    });
}

exports.marker_tag_get = (req, res, next) => {
    Marker.find({tags: req.params.tag, author: req.userId}, (err, results) => {
        if (err) {
            return next(err);
        }
        res.json(results);
    });
}