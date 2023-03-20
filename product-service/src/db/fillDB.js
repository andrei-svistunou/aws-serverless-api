const AWS = require('aws-sdk');
const mockProducts = require('../../mocks/products.json');

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'svistic' });
AWS.config.update({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB();

const fillItem = async (tableName, item) => {
    const params = {
        TableName: tableName,
        Item: item
    };
    return dynamodb.putItem(params).promise();
};

(async () => {
    try {
        for (const product of mockProducts.products) {
            const item = {
                'id': { S: product.id.toString() },
                'title': { S: product.title },
                'description': { S: product.description },
                'price': { N: product.price.toString() },
            };
            await fillItem('awsProducts', item);
        }

        for (const product of mockProducts.products) {
            const item = {
                'product_id': { S: product.id.toString() },
                'count': { N: product.count.toString() },
            };
            await fillItem('awsStocks', item);
        }
        console.log('Tables are created');
    } catch (error) {
        console.log('Error populating tables', error);
    }
})();