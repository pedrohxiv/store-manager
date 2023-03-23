const connection = require('./connection');

const create = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

const getAll = async () => {
  const query = `SELECT s.id AS saleId, 
    DATE_FORMAT(s.date, '%Y-%m-%dT%H:%i:%s.000Z') AS date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales AS s JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id ORDER BY saleId ASC, productId ASC`;
  const [sales] = await connection.execute(query);
  return sales.map((sale) => ({
    saleId: sale.saleId,
    date: sale.date,
    productId: sale.productId,
    quantity: sale.quantity,
  }));
};

const getById = async (id) => {
  const query = `SELECT s.id AS saleId, 
    DATE_FORMAT(s.date, '%Y-%m-%dT%H:%i:%s.000Z') AS date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales AS s JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id WHERE s.id = ?`;
  const [sale] = await connection.execute(query, [id]);
  return sale.map((s) => ({
    date: s.date,
    productId: s.productId,
    quantity: s.quantity,
  }));
};

module.exports = { create, getAll, getById };
