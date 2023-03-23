const express = require('express');

const salesController = require('../controllers/sales');
const salesValidation = require('../middlewares/sales');
const salesProductsValidation = require('../middlewares/salesProducts');

const router = express.Router();

router.post(
  '/',
  salesValidation.creationValidation,
  salesProductsValidation.creationValidation,
  salesController.create,
);

module.exports = router;
