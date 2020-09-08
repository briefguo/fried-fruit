const FCClient = require('@alicloud/fc2')
const fs = require('fs')

// https://github.com/aliyun/fc-nodejs-sdk
const client = new FCClient(process.env.ALIYUN_FC_ACCOUNT_ID, {
  accessKeyID: process.env.ALIYUN_ACCESSKEY_ID,
  accessKeySecret: process.env.ALIYUN_ACCESSKEY_SECRET,
  region: process.env.ALIYUN_FC_REGION_ID,
  timeout: 3 * 60 * 1000, // Request timeout in milliseconds, default is 10s
})

const serviceName = 'fried-fruit-fried-fruit-1D809C16E057'
const funcName = 'fried-fruit'
client
  .updateFunction(serviceName, funcName, {
    description: '发布新版 by briefguo' + Date.now(),
    initializationTimeout: 60,
    code: {
      zipFile: fs.readFileSync('public/tmp/fried-fruit.zip', 'base64'),
    },
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
