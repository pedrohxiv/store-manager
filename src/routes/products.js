const express = require('express');

const productsController = require('../controllers/products');
const productsValidation = require('../middlewares/products');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', productsValidation.creationValidation, productsController.create);

module.exports = router;
