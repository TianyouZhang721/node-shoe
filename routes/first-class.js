var express = require('express');
var router = express.Router();
const mysql = require('./../mysql/mysqlUtil');

// 获取大类列表
router.get('/getClass', function(req, res, next) {
    let skip = Number(req.query.skip) || 0;
    let limit = Number(req.query.limit) || 10;
    mysql("select * from class limit ?, ?", [skip, limit], function(err, data) {
        if (err) return res.json(err)
        res.json(data)
    })
})
// 获取大类数量
router.get('/countClass', function(req, res, next) {
    mysql("select count(*) as count from class", function(err, data) {
        if (err) return res.json(err)
        res.json(data)
    })
})
// 修改大类
router.post('/edit', function(req, res, next) {
    let classId = req.body.id;
    let url = req.body.url || null;
    let status = req.body.status || null;
    let title = req.body.title || null;
    let arr = [];
    if (url) arr.push(url);
    if (status) arr.push(status);
    if (title) arr.push(title);
    arr.push(classId);
    mysql(`update class set ${url ? 'url=?,': ''} ${status ? 'status=?,' : ''} ${title ? 'title=?' : ''} where id=?`, arr, function(err, data) {
        if (err) return res.json(err);
        if (data.affectedRows === 1) {
            res.json({code: 200, message: '修改成功'})
        }
    })
})
// 添加大类
router.post('/insert', function(req, res, next) {
    let url = req.body.url;
    let title = req.body.title;
    let status = '1';
    mysql("insert into class(id, url, title, status) values(null, ?, ?, ?)", [url, title, status], function(err, data) {
        if (err) return res.json(err)
        if (data.affectedRows === 1) {
            res.json({code: 200, message: '添加成功'})
        }
    })
})
module.exports = router;