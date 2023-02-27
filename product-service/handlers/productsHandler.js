'use strict';
const { getAllProducts } = require('../services/getAllProducts');

module.exports.getProductsList = async (event) => {
  const productList = getAllProducts();
  return {
    statusCode: 200,
    body: JSON.stringify(productList),
    isBase64Encoded: false
  };
};
