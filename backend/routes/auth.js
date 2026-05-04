var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    message: 'Auth route working'
  });
});

module.exports = router;