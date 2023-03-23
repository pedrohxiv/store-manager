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

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newProduct = await productsService.create(name);
    return res.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedProduct = await productsService.update(+id, name);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update };
