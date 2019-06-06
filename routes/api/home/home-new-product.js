/**
 * Create by xbh 2019-06-05 首页新品管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../../model/common-result');
const newProductService = require('../../../service/home/home-new-product-service');
/**
 * @api {post} /home/newProduct/create 添加首页推荐
 * @apiGroup home-newProduct
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {Array} [homeBrandList] 列表
 * @apiParamExample {json} Request-Example:
 * [
 *      {
 *         "subjectId":1,
 *         "productName":"华为 HUAWEI P20 "
 *      },
 *      {
 *         "subjectId":2,
 *         "productName":"HLA海澜之家简约动物印花短袖T恤"
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
 * @apiSampleRequest /home/newProduct/create
 */
router.post('/create', function (req, res, next) {
    let brandList = req.body;
    newProductService.create(brandList).then(value => {
        if (value) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});


/**
 * @api {post} /home/newProduct/update/sort/{id} 修改推荐排序
 * @apiGroup home-newProduct
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
 * @apiSampleRequest /home/newProduct/update/sort/:id
 */
router.post('/update/sort/:id', function (req, res, next) {
    let {id} = req.params;
    let {sort} = req.query;
    newProductService.updateSort(id, sort).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /home/newProduct/delete 批量删除推荐
 * @apiGroup home-newProduct
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
 * @apiSampleRequest /home/newProduct/delete
 */
router.post('/delete', function (req, res, next) {
    let {ids} = req.query;
    newProductService.delete(ids).then(value => {
        if (value > 0) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /home/newProduct/update/recommendStatus 批量修改推荐状态
 * @apiGroup home-newProduct
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
 * @apiSampleRequest /home/newProduct/update/recommendStatus
 */
router.post('/update/recommendStatus', function (req, res, next) {
    let {ids, recommendStatus} = req.query;
    newProductService.updateRecommendStatus(ids, recommendStatus).then(value => {
        if (value > 0) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /home/newProduct/list 分页查询推荐
 * @apiGroup home-newProduct
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
 * @apiSampleRequest /home/newProduct/list
 */
router.get('/list', function (req, res, next) {
    let {productName, recommendStatus, pageNum, pageSize} = req.query;
    pageNum = pageNum ? pageNum : 1;
    pageSize = pageSize ? pageSize : 5;
    newProductService.list(productName, recommendStatus, pageNum, pageSize)
        .then(value => res.json(result.pageSuccess(value)))
        .catch(e => res.json(result.exceptionFailed(e.message)));
});
module.exports=router;