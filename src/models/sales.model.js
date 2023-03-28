const connection = require('./connection');

// A tabela sales_products, com os atributos sale_id, product_id e quantity;

const registerSale = async (products) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [new Date()],
  );
  const promises = products.map(async (product) => connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, product.productId, product.quantity],
    ));
     
  await Promise.all(promises);
  return insertId;
};

module.exports = {
  registerSale,
};
