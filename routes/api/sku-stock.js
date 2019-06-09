/**
 * Create by xbh 2019-06-06 sku库存
 */
var express = require('express');
var router = express.Router();
const result = require('../../model/common-result');
const skuStockService = require('../../service/sku-stock-service');
/**
 * @api {get} /sku/{pid} 根据商品编号及编号模糊搜索sku库存
 * @apiGroup sku
 * @apiVersion 1.0.0
 * @apiName sku
 * @apiParam {Number} [pid] pid
 * @apiParam {String} [keyword] 关键词
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "message": "操作成功",
 *  "data": 1
 * }
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 error
 * {
 *  "code": 500,
 *  "message": "操作失败",
 * }
 * @apiSampleRequest /sku/:pid
 */
router.get('/:pid', function (req, res, next) {
    let {pid} = req.params;
    let {keyword} = req.query;
    skuStockService.list(pid, keyword)
        .then(data => res.json(result.success(data)))
        .catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /sku/update/{pid} 批量更新库存信息
 * @apiGroup sku
 * @apiVersion 1.0.0
 * @apiName update
 * @apiParam {String} [name] 名称
 * @apiParam {String} [description] 描述
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "message": "操作成功",
 *  "data": 1
 * }
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 error
 * {
 *  "code": 500,
 *  "message": "操作失败",
 * }
 * @apiSampleRequest /sku/update/:pid
 */
router.post('/update/:pid', function (req, res, next) {
    let {pid} = req.params;
    let skuStockList = req.body;
    skuStockService.update(pid, skuStockList).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});
module.exports = router;