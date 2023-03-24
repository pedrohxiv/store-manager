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

const update = async (id, sales) => {
  const saleId = await salesModel.getById(id);
  if (!saleId.length) throw httpErrGenerator(404, 'Sale not found');
  await sales.map((sale) => salesProductsModel.update(id, sale));
  return { saleId, itemsUpdated: sales };
};

module.exports = { create, getAll, getById, remove, update };
