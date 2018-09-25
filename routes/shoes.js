var express = require('express');
var router = express.Router();
const mysql = require('./../mysql/mysqlUtil');

// 获取商品数量
router.get('/count', function(req, res, next) {
    let classificationId = req.query.classificationId || null;
    let arr = classificationId ? [classificationId] : [];
    mysql(`select count(*) as count from shoes ${classificationId ? 'where classificationId=' : ''}`, arr, function(err, data) {
        if (err) return res.json(err)
        res.json(data)
    })
})
// 获取商品列表
router.get('/shoeList', function(req, res, next) {
    let classificationId = req.query.classificationId || null;
    let skip = req.query.skip || 0;
    let limit = req.query.limit || 10;
    let arr = classificationId ? [classificationId, skip, limit] : [skip, limit]
    mysql(`select * from shoes ${classificationId ? 'where classificationId=?' : ''} limit ?, ?`, arr, function(err, data) {
        if (err) return res.json(err);
        res.json(data)
    })
})
// 编辑商品
router.post('/edit', function(req, res, next) {
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
    let arr = [];
    if (url) arr.push(url)
    if (title) arr.push(title)
    if (price) arr.push(price)
    if (size) arr.push(size)
    if (pics) arr.push(pics)
    if (detail) arr.push(detail)
    if (classificationId) arr.push(classificationId)
    if (buyer) arr.push(buyer)
    if (status) arr.push(status)
    arr.push(createTime)
    arr.push(shoeId)
    mysql(`update shoes set ${url ? 'url=?,': ''} ${title ? 'title=?,' : ''} ${price ? 'price=?,' : ''} ${size ? 'size=?,' : ''} ${pics ? 'pic=?,' : ''} ${detail ? 'detail=?,' : ''} ${classificationId ? 'classificationId=?,' : ''} ${buyer ? 'buyer=?,' : ''} ${status ? 'status=?,' : ''} createTime=? where id=?`, arr, function(err, data) {
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
router.post('/create', function(req, res, next) {
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