const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const saleSchema = Joi.array().items(Joi.object({
  productId: Joi.number().required().label('productId'),
  quantity: Joi.number().min(1).required().label('quantity'),
})).messages({
    'any.required': '{{#label}} is required',
    'string.min': '{{#label}} must be greater than or equal to {{#limit}}',
  });

 module.exports = {
   productSchema,
   saleSchema,
 };
