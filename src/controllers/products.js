const productsService = require('../services/products');

const getAll = async (_req, res, next) => {
  try {
    const products = await productsService.getAll();
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(+id);
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAll, getById };
