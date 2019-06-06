/**
 * Create by xbh 2019-06-05 限时购场次管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../../model/common-result');
const flashSessionService = require('../../../service/flash/flash-promotion-session-service');

/**
 * @api {post} /flashSession/create 添加场次
 * @apiGroup flashSession
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {String} [name] 名称
 * @apiParam {String} [startTime] 开始时间
 * @apiParam {String} [endTime] 结束时间
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
 * @apiSampleRequest /flashSession/create
 */
router.post('/create', function (req, res, next) {
    let promotionSession = req.body;
    flashSessionService.create(promotionSession).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /flashSession/update/{id} 修改场次
 * @apiGroup flashSession
 * @apiVersion 1.0.0
 * @apiName update
 * @apiParam {Number} [id] ID
 * @apiParam {String} [name] 名称
 * @apiParam {String} [startTime] 开始时间
 * @apiParam {String} [endTime] 结束时间
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
 * @apiSampleRequest /flashSession/update/:id
 */
router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    let promotionSession = req.body;
    flashSessionService.update(id, promotionSession).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /flashSession/update/status/{id} 修改启用状态
 * @apiGroup flashSession
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
 * @apiSampleRequest /flashSession/update/status/:id
 */
router.post('/update/status/:id', function (req, res, next) {
    let {id} = req.params;
    let {status} = req.query;
    flashSessionService.updateStatus(id, status).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /flashSession/delete/{id} 删除场次
 * @apiGroup flashSession
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
 * @apiSampleRequest /flashSession/delete/:id
 */
router.post('/delete/:id', function (req, res, next) {
    let {id} = req.params;
    flashSessionService.delete(id).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /flashSession/{id} 获取场次详情
 * @apiGroup flashSession
 * @apiVersion 1.0.0
 * @apiName promotionSession
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
 * @apiSampleRequest /flashSession/:id
 */
router.get('/:id', function (req, res, next) {
    let {id} = req.params;
    flashSessionService.promotionSession(id).then(value => {
        let [promotionSession] = value;
        res.json(result.success(promotionSession));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /flashSession/list 获取全部场次
 * @apiGroup flashSession
 * @apiVersion 1.0.0
 * @apiName list
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
 * @apiSampleRequest /flashSession/list
 */
router.get('/list', function (req, res, next) {
    flashSessionService.list()
        .then(value => res.json(result.success(value)))
        .catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /flashSession/selectList 获取全部可选场次及其数量
 * @apiGroup flashSession
 * @apiVersion 1.0.0
 * @apiName selectList
 * @apiParam {Number} [flashPromotionId] flashPromotionId
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "message": "操作成功",
 *  "data": Array
 * }
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 error
 * {
 *  "code": 500,
 *  "message": "操作失败",
 * }
 * @apiSampleRequest /flashSession/selectList
 */
router.get('/selectList', function (req, res, next) {
    let {flashPromotionId} = req.query;
    flashSessionService.selectList(flashPromotionId)
        .then(value => res.json(result.pageSuccess(value)))
        .catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;