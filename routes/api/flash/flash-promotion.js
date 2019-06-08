/**
 * Create by xbh 2019-06-05 限时购活动管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../../model/common-result');
const promotionService = require('../../../service/flash/flash-promotion-service');

/**
 * @api {post} /flash/create 添加活动
 * @apiGroup flash
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {String} [title] 标题
 * @apiParam {String} [startDate] 开始时间
 * @apiParam {String} [endDate] 结束时间
 * @apiParam {Number} [status] 启用状态：0->不启用；1->启用
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
 * @apiSampleRequest /flash/create
 */
router.post('/create', function (req, res, next) {
    let promotion = req.body;
    promotionService.create(promotion).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /flash/update/{id} 编辑活动信息
 * @apiGroup flash
 * @apiVersion 1.0.0
 * @apiName update
 * @apiParam {Number} [id] ID
 * @apiParam {String} [title] 标题
 * @apiParam {String} [startDate] 开始时间
 * @apiParam {String} [endDate] 结束时间
 * @apiParam {Number} [status] 启用状态：0->不启用；1->启用
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
 * @apiSampleRequest /flash/update/:id
 */
router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    let promotion = req.body;
    promotionService.update(id, promotion).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /flash/delete/{id} 删除活动信息
 * @apiGroup flash
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
 * @apiSampleRequest /flash/delete/:id
 */
router.post('/delete/:id', function (req, res, next) {
    let {id} = req.params;
    promotionService.delete(id).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});


/**
 * @api {post} /flash/update/status/{id} 修改上下线状态
 * @apiGroup flash
 * @apiVersion 1.0.0
 * @apiName update-status
 * @apiParam {Number} [id] ID
 * @apiParam {Number} [status] status
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
 * @apiSampleRequest /flash/update/status/:id
 */
router.post('/update/status/:id', function (req, res, next) {
    let {id} = req.params;
    let {status} = req.query;
    promotionService.updateStatus(id, status).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /flash/{id} 获取场次详情
 * @apiGroup flash
 * @apiVersion 1.0.0
 * @apiName promotion
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
 * @apiSampleRequest /flash/:id
 */
router.get('/:id', function (req, res, next) {
    let {id} = req.params;
    promotionService.promotion(id).then(value => {
        let [promotion] = value;
        res.json(result.success(promotion));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /flash/list 分页查询不同场次关联及商品信息
 * @apiGroup flash
 * @apiVersion 1.0.0
 * @apiName list
 * @apiParam {String} [keyword] 关键词
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
 * @apiSampleRequest /flash/list
 */
router.get('/list', function (req, res, next) {
    let {keyword, pageNum, pageSize} = req.query;
    pageNum = pageNum ? pageNum : 1;
    pageSize = pageSize ? pageSize : 5;
    promotionService.list(keyword, pageNum, pageSize)
        .then(value => res.json(result.success(value)))
        .catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;