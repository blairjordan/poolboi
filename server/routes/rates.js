const express = require('express');
const router = express.Router();
const rateController = require('../controllers/rates.controller');

router.get('/sell/:currencyCode', function(req, res, next) {
  rateController.sellPrice(req, res);
});

module.exports = router;
