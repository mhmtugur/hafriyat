var express = require('express');
var router = express.Router();
var {UserController} = require('./userController');
var {YetkiController} = require('./yetkiController');

/* sign in */
router.post('/signin', UserController.signin);
router.post('/register', UserController.register);
router.post('/signout', UserController.signout);
//router.post('/loginuser', user.loginuser);

//TODO : https://www.npmjs.com/package/hashids paketini entegre et
router.post('/yetkiEkle', YetkiController.yetkiEkle);
router.delete('/yetkiSil/:yetkiId', YetkiController.yetkiSil);

module.exports = router;