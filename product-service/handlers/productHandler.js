'use strict';
const { getProductById } = require('../services/getProductById');

module.exports.getProduct = async (event) => {
  const product = await getProductById(event.pathParameters.id);
  return {
    statusCode: 200,
    body: JSON.stringify(product),
    isBase64Encoded: false
  };
};
