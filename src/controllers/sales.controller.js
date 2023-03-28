const salesService = require('../services/sales.service');
const { mapError } = require('../utils/errorMap');

const registerSale = async (req, res, next) => {
  const products = req.body;
  try {
    const { id, type, message } = await salesService.registerSale(products);
    if (type) return res.status(mapError(type)).json({ message });
    return res.status(201).json({ id, itemsSold: products });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerSale,
};
