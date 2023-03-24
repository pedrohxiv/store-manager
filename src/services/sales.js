const salesModel = require('../models/sales');
const salesProductsModel = require('../models/salesProducts');

const httpErrGenerator = (status, message) => ({ status, message });

const create = async (sales) => {
  const saleId = await salesModel.create();
  await sales.map((sale) =>
    salesProductsModel.create(saleId, sale.productId, sale.quantity));
  return { id: saleId, itemsSold: sales };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale.length) throw httpErrGenerator(404, 'Sale not found');
  return sale;
};

const remove = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale.length) throw httpErrGenerator(404, 'Sale not found');
  await salesModel.remove(id);
};

module.exports = { create, getAll, getById, remove };
