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
router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.delete('/:id', salesController.remove);

module.exports = router;
