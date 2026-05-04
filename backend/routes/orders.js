var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    message: 'Orders route working'
  });
});

module.exports = router;