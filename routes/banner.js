var express = require('express');
var router = express.Router();
const mysql = require('./../mysql/mysqlUtil');

/* GET home page. */
// 获取banner列表
router.get('/getBanner', function(req, res, next) {
  let skip = Number(req.query.skip) || 0;
  let limit = Number(req.query.limit) || 5;
  mysql('select * from banner limit ?, ?', [skip, limit], function(err, data) {
    if (err) return res.json(err)
    res.json(data)
  })
})
// 获取banner数量
router.get('/countBanner', function(req, res, next) {
  mysql('select count(*) as count from banner', function(err, data) {
    if (err) return res.json(err)
    res.json(data)
  })
})
// 添加banner
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
// 修改banner
router.post('/edit', function(req, res, next) {
  let bannerId = req.body.id;
  let url = req.body.url || null;
  let createTime = new Date();
  let status = req.body.status || null;
  let arr = [];
  if (url) arr.push(url)
  if (status) arr.push(status)
  arr.push(createTime)
  arr.push(bannerId)
  mysql(`update banner set ${url ? 'url=?,' : ''} ${status ? 'status=?,' : ''} createTime=?  where id=?`, arr, function(err, data) {
    if (err) return res.json(err);
    if (data.affectedRows === 1) {
      res.json({code: 200, message: '修改成功'})
    }
  })
})
module.exports = router;
