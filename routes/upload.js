var express = require('express');
var router = express.Router();
const mysql = require('./../mysql/mysqlUtil');
// if use in react , you can use require('ali-oss/dist/aliyun-oss-sdk.js'), or see webpack.prod.js
// import local for test
// const OSS = require('../../lib/browser.js');
const OSS = require('ali-oss');
const crypto = require('crypto');
const { STS } = require('ali-oss');

const bucket = 'shoemanagement721';
const region = 'oss-cn-beijing';
var service = require('./service.js')

router.get('/alioss/getOssToken', function(req, res, next) {
    // res.append('Access-Control-Allow-Origin', '*')
    const result = service.getOssToken(req, res)
    console.log(result)
    if (result) {
        res.json({
            code: 200,
            data: result
        })
    }
    // res.json({code: 200})
})
module.exports = router;