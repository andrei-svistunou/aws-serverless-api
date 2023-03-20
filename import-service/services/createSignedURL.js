const AWS = require('aws-sdk');

module.exports.createSignedURL = async (fileName) => {
    if (!fileName) {
        return null;
    }

    const s3 = new AWS.S3({ region: 'us-east-1' });
    const Bucket = 'import-service-bucket-s3';
    const catalogPath = `uploaded/${fileName}`;
    const params = {
        Bucket,
        Key: catalogPath,
        Expires: 60000,
        ContentType: 'text/csv'
    };

    try {
        const signedUrl = await s3.getSignedUrlPromise('putObject', params);
        console.log('The URL is', signedUrl);
        return signedUrl;
    } catch(e) {
        console.log('Error: ', e);
        return null;
    }    
}
