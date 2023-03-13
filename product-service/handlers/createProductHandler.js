'use strict';
const { addProduct } = require('../services/createProduct');

module.exports.createProduct = async (event) => {
  const result = await addProduct(event.body);
  return {
    statusCode: 200,
    body: result,
  };
};
