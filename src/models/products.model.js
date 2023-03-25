const connection = require('./connection');

const getAll = async () => {
  const products = connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM exercises.employees WHERE id = ?',
    [id],
  );
  return product;
};

module.exports = {
  getAll,
  getById,
};
