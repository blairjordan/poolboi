const express = require('express');
const router = express.Router();
const poolController = require('../controllers/pool.controller');
const contributionController = require('../controllers/contribution.controller');


router.get('/', function(req, res, next) {
  poolController.all(req, res);
});

router.post('/add', function(req, res, next) {
  poolController.add(req, res);
});

router.get('/:poolId/contributions', function(req, res, next) {
  poolController.getContributions(req, res);
});

router.post('/:poolId/contributions/add', function(req, res, next) {
  contributionController.add(req, res);
});


module.exports = router;
