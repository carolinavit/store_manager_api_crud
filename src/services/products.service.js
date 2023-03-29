const productsModel = require('../models/products.model');
const { validateNewProduct } = require('./validations/validateInputProduct');

const httpErrGenerator = (status, message) => ({ status, message });

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) {
    throw httpErrGenerator(404, 'Product not found');
  }
  return product;
};

const create = async (name) => {
  const error = validateNewProduct(name);
  if (error.type) return error;
  const id = await productsModel.create(name);
  return { id };
};

const update = async (id, name) => {
  const error = validateNewProduct(name);
  if (error.type) return error;
  const affectedRows = await productsModel.update(id, name);
  if (!affectedRows) {
    throw httpErrGenerator(404, 'Product not found');
  }
  return { type: null, message: name };
};

module.exports = {
  getAll,
  getById,
  create,
  httpErrGenerator,
  update,
};
