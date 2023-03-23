const salesModel = require('../models/sales');
const salesProductsModel = require('../models/salesProducts');

const create = async (sales) => {
  const saleId = await salesModel.create();
  await sales.map((sale) =>
    salesProductsModel.create(saleId, sale.productId, sale.quantity));
  return { id: saleId, itemsSold: sales };
};

module.exports = { create };
