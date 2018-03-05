/* eslint-disable import/no-extraneous-dependencies, no-unused-vars */
import s3 from 's3';
import credentials from './credentials.json';


const client = s3.createClient({
  s3Options: credentials,
});


const imageUploader = client.uploadDir({
  localDir: './src/assets/images',

  s3Params: {
    Bucket: credentials.bucket,
    Prefix: 'assets/images/',
  },
});
