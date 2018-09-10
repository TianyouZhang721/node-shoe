var express = require('express');
var router = express.Router();
const mysql = require('./../mysql/mysqlUtil');

/* GET home page. */
router.get('/getBanner', function(req, res, next) {
  mysql('select * from banner', function(err, data) {
    if (err) return res.json(err)
    res.json(data)
  })
})

router.post('/insert', function(req, res, next) {
  let url = req.body.url;
  let createTime = new Date();
  let status = '1';
  mysql('insert into banner(id, url, createTime, status) values(null, ?, ?, ?)', [url, createTime, status], function(err, data) {
    if (err) return res.json(err)
    if (data.affectedRows === 1) {
      res.json({code: 200, message: '添加成功'})
    }
  })
})
module.exports = router;
