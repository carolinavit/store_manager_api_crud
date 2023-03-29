const connection = require('./connection');

const getAll = async () => {
  const products = connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return product;
};

const create = async (name) => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO products (name) VALUES (?)',
      [name],
    );
    return insertId;
};

const update = async (id, name) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?', [name, id],
  );
  return affectedRows;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
