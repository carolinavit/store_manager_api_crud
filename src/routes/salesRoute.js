const express = require('express');

const router = express.Router();

const salesController = require('../controllers/sales.controller');

router.get('/:id', salesController.getBySaleId);
router.get('/', salesController.getAllSales);
router.post('/', salesController.registerSale);

module.exports = router;
