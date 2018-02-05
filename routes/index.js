var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Discart' });
});

router.get('/auth', function(req, res, next) {
  res.render('auth', { title: 'Discart - Login OR Register' });
});

module.exports = router;
