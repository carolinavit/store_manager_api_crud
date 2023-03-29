const productService = require('../services/products.service');
const { mapError } = require('../utils/errorMap');

const getAll = async (_req, res, next) => {
  try {
    const [products] = await productService.getAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
   try {
     const { name } = req.body;
     const { id, type, message } = await productService.create(name);
     if (type) return res.status(mapError(type)).json({ message });
     return res.status(201).json({ id, name });
   } catch (error) {
     next(error);
   }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { type, message } = await productService.update(id, name);
    if (type) return res.status(mapError(type)).json({ message });
    return res.status(200).json({ id, name: message });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
