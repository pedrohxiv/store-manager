const connection = require('./connection');

const create = async (saleId, productId, quantity) => {
  const [{ newSalesProducts }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return newSalesProducts;
};

module.exports = { create };
