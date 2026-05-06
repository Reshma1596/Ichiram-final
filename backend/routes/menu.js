var express = require('express');
var router = express.Router();
var Menu = require('../models/Menu');

router.get('/', async function(req, res, next) {
  try {
    var items = await Menu.find().lean();

    var normalizedItems = items.map(function(item) {
      return {
        ...item,
        id: item._id.toString()
      };
    });

    res.json(normalizedItems);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch menu',
      error: error.message
    });
  }
});

module.exports = router;