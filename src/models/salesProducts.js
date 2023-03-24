const connection = require('./connection');

const create = async (saleId, productId, quantity) => {
  const [{ newSalesProducts }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return newSalesProducts;
};

const update = async (id, sale) => {
  const [{ insertId }] = await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [sale.quantity, id, sale.productId],
  );
  return insertId;
};

module.exports = { create, update };
