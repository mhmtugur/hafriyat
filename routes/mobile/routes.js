var express = require('express');
var router = express.Router();
var {MobileController} = require('./mobileController');

/* sign in */
router.post('/users', MobileController.users);


module.exports = router;