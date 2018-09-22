var express = require('express');
var router = express.Router();
const mysql = require('./../mysql/mysqlUtil');

// 获取商品数量
router.get('/count', function(req, req, next) {
    let classificationId = req.query.classificationId;
    mysql('select count(*) as count from shoes where classificationId=?', [classificationId], function(err, data) {
        if (err) return res.json(err)
        res.json(data)
    })
})
// 获取商品列表
router.get('/shoeList', function(res, req, next) {
    let classificationId = req.query.classificationId;
    let skip = req.query.skip || 0;
    let limit = req.query.limit || 10;
    mysql("select * from shoes where classificationId=? limit ?, ?", [classificationId, skip, limit], function(err, data) {
        if (err) return res.json(err);
        res.json(data)
    })
})
// 编辑商品
router.post('/edit', function(res, req, next) {
    let shoeId = req.body.id;
    let url = req.body.url;
    let title = req.body.title;
    let price = req.body.price;
    let size = req.body.size;
    let pics = req.body.pics;
    let detail = req.body.detail;
    let classificationId = req.body.classificationId;
    let buyer = req.body.buyer;
    let createTime = new Date();
    let status = req.body.status;
    mysql("update shoes set url=?, title=?, price=?, size=?, pic=?, detail=?, classificationId=?, buyer=?, status=?, createTime=? where id=?", [url, title, price, size, pics, detail, classificationId, buyer, status, createTime, shoeId], function(err, data) {
        if (err) return res.json(err)
        if (data.affectedRows=== 1) {
            res.json({
                code: 200,
                message: '修改成功'
            })
        }
    })
})

// 新增商品
router.post('/create', function(res, req, next) {
    let url = req.body.url;
    let title = req.body.title;
    let price = req.body.price;
    let size = req.body.size;
    let pics = req.body.pics;
    let detail = req.body.detail;
    let classificationId = req.body.classificationId;
    let buyer = req.body.buyer;
    let createTime = new Date();
    let status = '1';
    mysql("insert into shoes(id, url, title, price, size, pic, detail, classificationId, buyer, createTime, status) values(null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [url, title, price, size, pics, detail, classificationId, buyer, createTime, status], function(err, data) {
        if (err) return res.json(err)
        if (data.affectedRows === 1) {
            res.json({
                code: 200,
                message: '添加成功'
            })
        }
    })
})
module.exports = router;