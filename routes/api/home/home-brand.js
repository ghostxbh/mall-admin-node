/**
 * Create by xbh 2019-06-05 首页品牌管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../../model/common-result');
const brandService = require('../../../service/home/home-brand-service');
/**
 * @api {post} /home/brand/create 添加首页推荐品牌
 * @apiGroup home-brand
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
 * @apiSampleRequest /home/brand/create
 */
router.post('/create', function (req, res, next) {
    let brandList = req.body;
    brandService.create(brandList).then(value => {
        if (value) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});


/**
 * @api {post} /home/brand/update/sort/{id} 修改推荐排序品牌
 * @apiGroup home-brand
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
 * @apiSampleRequest /home/brand/update/sort/:id
 */
router.post('/update/sort/:id', function (req, res, next) {
    let {id} = req.params;
    let {sort} = req.query;
    brandService.updateSort(id, sort).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /home/brand/delete 批量删除推荐品牌
 * @apiGroup home-brand
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
 * @apiSampleRequest /home/brand/delete
 */
router.post('/delete', function (req, res, next) {
    let {ids} = req.query;
    brandService.delete(ids).then(value => {
        if (value > 0) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /home/brand/update/recommendStatus 批量修改推荐状态
 * @apiGroup home-brand
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
 * @apiSampleRequest /home/brand/update/recommendStatus
 */
router.post('/update/recommendStatus', function (req, res, next) {
    let {ids, recommendStatus} = req.query;
    brandService.updateRecommendStatus(ids, recommendStatus).then(value => {
        if (value > 0) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /home/brand/list 分页查询推荐品牌
 * @apiGroup home-brand
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
 * @apiSampleRequest /home/brand/list
 */
router.get('/list', function (req, res, next) {
    let {productName, recommendStatus, pageNum, pageSize} = req.query;
    pageNum = pageNum ? pageNum : 1;
    pageSize = pageSize ? pageSize : 5;
    brandService.list(productName, recommendStatus, pageNum, pageSize)
        .then(value => res.json(result.pageSuccess(value)))
        .catch(e => res.json(result.exceptionFailed(e.message)));
});
module.exports=router;