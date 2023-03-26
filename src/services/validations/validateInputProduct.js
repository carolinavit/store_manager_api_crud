const { productSchema } = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = productSchema.validate({ name });
  if (error) {
    if (!name) {
      return { type: 'NAME_REQUIRED', message: error.message };
    }
    if (name.length < 5) {
      return { type: 'INVALID_VALUE', message: error.message };
    }
    }
  
  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
};
