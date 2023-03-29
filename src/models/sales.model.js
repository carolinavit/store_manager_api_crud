const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(`SELECT sp.sale_id AS saleId,
   sales.date, sp.product_id as productId, sp.quantity
   FROM sales_products AS sp INNER JOIN sales ON sales.id = sp.sale_id`);
  return sales;
};

const getBySaleId = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id AS productId, quantity
    FROM StoreManager.sales INNER JOIN StoreManager.sales_products
    ON id = sale_id WHERE id = ?`,
    [id],
  );
  return sale;
};

const registerSale = async (products) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [new Date()],
  );
  const promises = products.map(async (product) =>
    connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, product.productId, product.quantity],
    ));

  await Promise.all(promises);
  return insertId;
};

module.exports = {
  getAllSales,
  getBySaleId,
  registerSale,
};
