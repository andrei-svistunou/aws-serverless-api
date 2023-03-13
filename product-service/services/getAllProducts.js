const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.getAllProducts = async () => {
    try {
        const result = await dynamodb.scan({ TableName: 'awsProducts' }).promise();
        const products = result.Items;

        const stockPromises = products.map(async (product) => {
            const stockResult = await dynamodb.get({
                TableName: 'awsStocks',
                Key: { product_id: product.id },
            })
                .promise();

            const stock = stockResult.Item;
            return { ...product, count: stock.count };
        })

        const inStockProducts = await Promise.all(stockPromises);

        return inStockProducts;

    } catch (error) {
        console.error(error);

        return [];
    }
}

