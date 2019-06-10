/**
 * Create by xbh 2019-06-07 商品管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../../model/common-result');
const productService = require('../../../service-product-service');
/**
 * @api {post} /product/create 创建商品
 * @apiGroup product
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {Array} [homeBrandList] 列表
 * @apiParamExample {json} Request-Example:
 * [
 *      {
 *         "subjectId":1,
 *         "productName":"万和"
 *      },
 *      {
 *         "subjectId":2,
 *         "productName":"三星"
 *      },
 * ]
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
 * @apiSampleRequest /product/create
 */
router.post('/create', function (req, res, next) {
    let productList = req.body;
    productService.create(productList).then(value => {
        if (value) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});


/**
 * @api {post} /product/update/sort/{id} 修改推荐排序品牌
 * @apiGroup product
 * @apiVersion 1.0.0
 * @apiName update-sort
 * @apiParam {Number} [id] ID
 * @apiParam {Number} [sort] sort
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
 * @apiSampleRequest /product/update/sort/:id
 */
router.post('/update/sort/:id', function (req, res, next) {
    let {id} = req.params;
    let {sort} = req.query;
    productService.updateSort(id, sort).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /product/delete 批量删除推荐品牌
 * @apiGroup product
 * @apiVersion 1.0.0
 * @apiName delete
 * @apiParam {Array} [ids] IDS
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
 * @apiSampleRequest /product/delete
 */
router.post('/delete', function (req, res, next) {
    let {ids} = req.query;
    productService.delete(ids).then(value => {
        if (value > 0) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /product/update/recommendStatus 批量修改推荐状态
 * @apiGroup product
 * @apiVersion 1.0.0
 * @apiName update-recommendStatus
 * @apiParam {Array} [ids] IDS
 * @apiParam {Number} [recommendStatus] 状态
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
 * @apiSampleRequest /product/update/recommendStatus
 */
router.post('/update/recommendStatus', function (req, res, next) {
    let {ids, recommendStatus} = req.query;
    productService.updateRecommendStatus(ids, recommendStatus).then(value => {
        if (value > 0) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /product/list 分页查询推荐品牌
 * @apiGroup product
 * @apiVersion 1.0.0
 * @apiName list
 * @apiParam {String} [productName] 专题名称
 * @apiParam {Number} [recommendStatus] 状态
 * @apiParam {Number} [pageNum] 页数
 * @apiParam {Number} [pageSize] 条数
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
 * @apiSampleRequest /product/list
 */
router.get('/list', function (req, res, next) {
    let {productName, recommendStatus, pageNum, pageSize} = req.query;
    pageNum = pageNum ? pageNum : 1;
    pageSize = pageSize ? pageSize : 5;
    productService.list(productName, recommendStatus, pageNum, pageSize)
        .then(value => res.json(result.pageSuccess(value)))
        .catch(e => res.json(result.exceptionFailed(e.message)));
});
module.exports=router;