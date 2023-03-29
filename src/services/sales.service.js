const salesModel = require('../models/sales.model');
const { validateNewSale } = require('./validations/validateNewSale');
const productService = require('./products.service');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  console.log(sales);
  return sales;
};

const getBySaleId = async (id) => {
  const sale = await salesModel.getBySaleId(id);
  if (!sale.length) {
    throw productService.httpErrGenerator(404, 'Sale not found');
  }
  return { type: null, message: sale };
};

const registerSale = async (products) => {
  const error = validateNewSale(products);
  if (error.type) return error;
  const promises = products.map(async (product) =>
    productService.getById(product.productId));

  await Promise.all(promises);
  const id = await salesModel.registerSale(products);
  return { id };
};

module.exports = {
  getAllSales,
  getBySaleId,
  registerSale,
};
