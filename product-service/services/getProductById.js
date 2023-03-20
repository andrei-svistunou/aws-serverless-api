const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const defaultProduct = {
    id: 0,
    title: "Product Default",
    description: "Description",
    price: 0
};

module.exports.getProductById = async (productId) => {
    try {
    
        const resultProduct = await dynamodb.get({ TableName: 'awsProducts', Key: { id: productId } }).promise();
        const productItem = resultProduct.Item;
        console.log('productItem', JSON.stringify(productItem));
        if (productItem) {
            const resultStocks = await dynamodb.get({ TableName: 'awsStocks', Key: { product_id: productItem.id } }).promise();
            const stockItem = resultStocks.Item;
            console.log('stockItem', JSON.stringify(stockItem));
            return { ...productItem, count: stockItem.count }
        } else {
            return defaultProduct
        }

    } catch(e) {
        console.log('Error: ', e);
        return defaultProduct
    }    
}
