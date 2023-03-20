const AWS = require('aws-sdk');
const csv = require('csv-parser');

module.exports.detectFile = async (cloud) => {
    const s3 = new AWS.S3({ region: 'us-east-1' });
    const Bucket = cloud.bucket.name;
    const Key = cloud.object.key;
    const params = {
        Bucket,
        Key,
    };
    return new Promise((resolve) => {
        const s3Stream = s3.getObject(params).createReadStream();
        console.log('The URL is', s3Stream);
        s3Stream.pipe(csv()).on('data', (chunk) => {
            console.log(JSON.stringify(chunk));
        }).on('error', (err) => {
            console.log('Error: ', err);
        }).on('end', () => {
            console.log('CSV file processing complete.');
            resolve();
        });
    });
}
