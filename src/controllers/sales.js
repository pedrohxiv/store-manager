const salesService = require('../services/sales');

const create = async (req, res, next) => {
  try {
    const sales = req.body;
    const newSales = await salesService.create(sales);
    return res.status(201).json(newSales);
  } catch (error) {
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(+id);
    return res.status(200).json(sale);
  } catch (error) {
    return next(error);
  }
};

module.exports = { create, getAll, getById };
