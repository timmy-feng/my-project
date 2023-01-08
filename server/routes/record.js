const express = require("express");
const router = express.Router();

const marker_controller = require("../controllers/markerController");
const user_controller = require('../controllers/userController');

router.post('/marker/create', [user_controller.user_verify, marker_controller.marker_create_post]);

router.get('/marker/listing', [user_controller.user_verify, marker_controller.marker_listing_get]);

router.post('/marker/delete/:id', [user_controller.user_verify, marker_controller.marker_delete_post]);

router.post('/marker/update/:id', [user_controller.user_verify, marker_controller.marker_update_post]);

router.get('/marker/tag/:tag', [user_controller.user_verify, marker_controller.marker_tag_get]);

router.get('/marker/get/:id', [user_controller.user_verify, marker_controller.marker_get]);

router.post('/user/login', user_controller.user_login);

router.post('/user/register', [user_controller.user_register, user_controller.user_login])

router.get('/user/username', [user_controller.user_verify, user_controller.username_get]);

module.exports = router;