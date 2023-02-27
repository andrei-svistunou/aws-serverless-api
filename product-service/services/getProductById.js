const mockProducts = require('../mocks/products.json');

const defaultProduct = {
    id: 0,
    title: "Product Default",
    description: "Description",
    price: 0
};

module.exports.getProductById = (productId) => {
    const requestedProduct = mockProducts.products.find(({ id }) => id === Number(productId));
    return requestedProduct || defaultProduct;
}
