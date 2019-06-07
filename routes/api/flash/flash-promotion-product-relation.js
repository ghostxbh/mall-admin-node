/**
 * Create by xbh 2019-06-05 限时购和商品关系管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../../model/common-result');
const flashproductRelationService = require('../../../service/flash/flash-promotion-product-relation-service');

/**
 * @api {post} /flashproductRelation/create 批量选择商品添加关联
 * @apiGroup flashproductRelation
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {Array} [relationList] 列表
 * @apiParamExample {json} Request-Example:
 * [
 *      {
 *          "flashPromotionId":1,
 *          "flashPromotionSessionId":5,
 *          "productId":21,
 *          "flashPromotionPrice":88.88,
 *          "flashPromotionCount":10,
 *          "flashPromotionLimit":2,
 *          "sort":100
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
 * @apiSampleRequest /flashproductRelation/create
 */
router.post('/create', function (req, res, next) {
    let productRelationList = req.body;
    flashproductRelationService.create(productRelationList).then(value => {
        if (value > 0) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /flashproductRelation/update/{id} 修改关联相关信息
 * @apiGroup flashproductRelation
 * @apiVersion 1.0.0
 * @apiName update
 * @apiParam {Number} [id] ID
 * @apiParam {Number} [flashPromotionId] 限时购ID
 * @apiParam {Number} [flashPromotionSessionId] 限时购场次ID
 * @apiParam {Number} [productId] 商品ID
 * @apiParam {Number} [flashPromotionPrice] 限时购价格
 * @apiParam {Number} [flashPromotionCount] 限时购数量
 * @apiParam {Number} [flashPromotionLimit] 限购数量
 * @apiParam {Number} [sort] 排序
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
 * @apiSampleRequest /flashproductRelation/update/:id
 */
router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    let productRelation = req.body;
    flashproductRelationService.update(id, productRelation).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /flashproductRelation/delete/{id} 删除关联
 * @apiGroup flashproductRelation
 * @apiVersion 1.0.0
 * @apiName delete
 * @apiParam {Number} [id] ID
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
 * @apiSampleRequest /flashproductRelation/delete/:id
 */
router.post('/delete/:id', function (req, res, next) {
    let {id} = req.params;
    flashproductRelationService.delete(id).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /flashproductRelation/{id} 获取管理商品促销信息
 * @apiGroup flashproductRelation
 * @apiVersion 1.0.0
 * @apiName productRelation
 * @apiParam {Number} [id] ID
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
 * @apiSampleRequest /flashproductRelation/:id
 */
router.get('/:id', function (req, res, next) {
    let {id} = req.params;
    flashproductRelationService.productRelation(id).then(value => {
        let [productRelation] = value;
        res.json(result.success(productRelation));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /flashproductRelation/list 分页查询不同场次关联及商品信息
 * @apiGroup flashproductRelation
 * @apiVersion 1.0.0
 * @apiName list
 * @apiParam {Number} [flashPromotionId] 限时购ID
 * @apiParam {Number} [flashPromotionSessionId] 限时购场次ID
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
 * @apiSampleRequest /flashproductRelation/list
 */
router.get('/list', function (req, res, next) {
    let {flashPromotionId, flashPromotionSessionId, pageNum, pageSize} = req.query;
    pageNum = pageNum ? pageNum : 1;
    pageSize = pageSize ? pageSize : 5;
    flashproductRelationService.list(flashPromotionId, flashPromotionSessionId, pageNum, pageSize)
        .then(value => res.json(result.success(value)))
        .catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;