const fs = require('fs')
const config = require('config');
const S3 = require('aws-sdk/clients/s3')
require('aws-sdk/lib/maintenance_mode_message').suppress = true;


const BucketName = config.get('awsBucketName')
const Region = config.get('awsBucketRegion')
const AccessKey = config.get('awsAccessKey')
const SecretKey = config.get('awsSecretKey')

const s3 = new S3({
    region: Region,
    accessKeyId: AccessKey,
    secretAccessKey: SecretKey
})


//uploads a file to s3
function uploadFile(file) {

    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
      Bucket: BucketName,
      Body: fileStream,
      Key: file.filename
    }
    return s3.upload(uploadParams).promise()
  }
  exports.uploadFile = uploadFile


//downloads a file from s3
function getFileStream(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: BucketName
    }
  
    return s3.getObject(downloadParams).createReadStream()
  }
  exports.getFileStream = getFileStream