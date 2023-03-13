const AWS = require('aws-sdk');
const crypto = require('crypto');

const dynamodb = new AWS.DynamoDB();
const addItem = async (tableName, item) => {
    const params = {
        TableName: tableName,
        Item: item
    };
    return dynamodb.putItem(params).promise();
};

module.exports.addProduct = async (newProductData) => {
    const { title, description, price, count } = JSON.parse(newProductData.toString('base64'));

    if (!title && !description && !price && !count) {
        throw new Error('');
    }

    const newProduct = {
        id: { S: crypto.randomUUID() },
        title: { S: title },
        description: { S: description },
        price: { N: price }
    };

    const newStockItem = {
        product_id: newProduct.id,
        count: { N: count }
    }

    try {
        await addItem('awsProducts', newProduct);
        await addItem('awsStocks', newStockItem);

        return 'Created';

    } catch (error) {
        console.error(error);
        return error.message;
    }   
}
