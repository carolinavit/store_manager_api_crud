const { saleSchema } = require('./schemas');

const validateNewSale = (products) => {
  const { error } = saleSchema.validate(products);
  if (error) {
    if (error.message.includes('required')) {
      return { type: 'INPUT_REQUIRED', message: error.message };
    } 
     if (error.message.includes('greater')) {
       return { type: 'INVALID_VALUE', message: error.message };
     } 
  }

  return { type: null, message: '' };
};

module.exports = {
  validateNewSale,
};
