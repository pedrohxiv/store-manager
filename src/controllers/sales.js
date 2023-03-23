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

module.exports = { create };