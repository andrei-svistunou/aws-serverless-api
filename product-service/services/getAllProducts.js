const mockProducts = require('../mocks/products.json');

module.exports.getAllProducts = () => {
    return mockProducts.products;
}

