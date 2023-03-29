const salesService = require('../services/sales.service');
const { mapError } = require('../utils/errorMap');

const getAllSales = async (_req, res, next) => {
  try {
    const sales = await salesService.getAllSales();
    res.status(200).json(sales);
    console.log(sales);
  } catch (error) {
    next(error);
  }
};

const getBySaleId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, message } = await salesService.getBySaleId(id);
    if (type) return res.status(mapError(type)).json({ message });
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

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
  getAllSales,
  getBySaleId,
  registerSale,
};
