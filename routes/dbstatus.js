var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require(path.join(__dirname, '/../config/mysql'));

/* GET db status. */
router.get('/', function(req, res, next) {

  mysql
  .authenticate()
  .then(() => {
    res.send('Mysql connection successful');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    res.send('Mysql connection successful '+err);
  });

});

module.exports = router;
