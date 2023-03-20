'use strict';
const { detectFile } = require('../services/detectFile');

module.exports.importFileParser = async (event) => {
  console.log('importFileParser event: ', JSON.stringify(event));
  const { s3 } = event.Records[0];
  await detectFile(s3);

  return {
    statusCode: 200,
    body: 'Done',
    isBase64Encoded: false
  };
};
