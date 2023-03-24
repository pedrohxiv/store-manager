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

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.remove(+id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sales = req.body;
    const updatedSales = await salesService.update(+id, sales);
    return res.status(200).json(updatedSales);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, getById, remove, update };
