'use strict';
const { createSignedURL } = require('../services/createSignedURL');

module.exports.importProductsFile = async (event) => {
  console.log('importProductsFile event: ', JSON.stringify(event));
  const { name } = event.queryStringParameters || {};
  const uploadedUrl = await createSignedURL(name);
  
  if (!uploadedUrl) {
    return {
      statusCode: 400,
      body: 'Bad request',
      isBase64Encoded: false
    };
  };

  return {
    statusCode: 200,
    body: uploadedUrl,
    isBase64Encoded: false
  };
};
