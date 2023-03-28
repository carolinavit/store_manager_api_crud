const salesModel = require('../models/sales.model');
const { validateNewSale } = require('./validations/validateNewSale');
const productService = require('./products.service');

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
  registerSale,
};
