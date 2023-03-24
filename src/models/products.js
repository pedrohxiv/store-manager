const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const create = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [newProduct] = await connection.execute(query, [name]);
  return { id: newProduct.insertId, name };
};

const update = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  await connection.execute(query, [name, id]);
};

const remove = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = { getAll, getById, create, update, remove };
