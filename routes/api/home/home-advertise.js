/**
 * Create by xbh 2019-06-05 首页轮播广告管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../../model/common-result');
const advertiseService = require('../../../service/home/home-advertise-service');
/**
 * @api {post} /home/advertise/create 添加广告
 * @apiGroup home-advertise
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {String} [name] 名称
 * @apiParam {Number} [type] 轮播位置：0->PC首页轮播；1->app首页轮播
 * @apiParam {String} [pic] 地址
 * @apiParam {String} [startTime] 开始时间
 * @apiParam {String} [endTime] 结束时间
 * @apiParam {Number} [status] 上下线状态：0->下线；1->上线
 * @apiParam {String} [url] 链接地址
 * @apiParam {String} [note] 备注
 * @apiParamExample {json} Request-Example:
 * {
 *   "name":"汽车推荐广告",
 *   "type":1,
 *   "pic":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20181113/car_ad2.jpg",
 *   "startTime":"2019-05-06 10:00:00",
 *   "endTime":"2019-05-07 10:00:00",
 *   "status":1,
 *   "url":"xxx",
 *   "note":"电影推荐广告"
 * }
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
 * @apiSampleRequest /home/advertise/create
 */
router.post('/create', function (req, res, next) {
    let advertise = req.body;
    advertiseService.create(advertise).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /home/advertise/delete 删除广告
 * @apiGroup home-advertise
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
 * @apiSampleRequest /home/advertise/delete
 */
router.post('/delete', function (req, res, next) {
    let {ids} = req.query;
    advertiseService.delete(ids).then(value => {
        if (value > 0) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /home/advertise/update/status/{id} 修改上下线状态
 * @apiGroup home-advertise
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
 * @apiSampleRequest /home/advertise/update/status/:id
 */
router.post('/update/status/:id', function (req, res, next) {
    let {id} = req.params;
    let {status} = req.query;
    advertiseService.updateStatus(id, status).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /home/advertise/{id} 获取广告详情
 * @apiGroup home-advertise
 * @apiVersion 1.0.0
 * @apiName advertise
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
 * @apiSampleRequest /home/advertise/:id
 */
router.get('/:id', function (req, res, next) {
    let {id} = req.params;
    advertiseService.advertise(id)
        .then(value => {
            let [advertise] = value;
            res.json(result.success(advertise))
        })
        .catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /home/advertise/update/{id} 修改广告
 * @apiGroup home-advertise
 * @apiVersion 1.0.0
 * @apiName update-advertise
 * @apiParam {Number} [id] ID
 * @apiParam {String} [name] 名称
 * @apiParam {Number} [type] 轮播位置：0->PC首页轮播；1->app首页轮播
 * @apiParam {String} [pic] 地址
 * @apiParam {String} [startTime] 开始时间
 * @apiParam {String} [endTime] 结束时间
 * @apiParam {Number} [status] 上下线状态：0->下线；1->上线
 * @apiParam {Number} [clickCount] 点击数
 * @apiParam {Number} [orderCount] 下单数
 * @apiParam {String} [url] 链接地址
 * @apiParam {String} [note] 备注
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
 * @apiSampleRequest /home/advertise/update/:id
 */
router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    let advertise = req.body;
    advertiseService.update(id, advertise).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /home/advertise/list 分页查询广告
 * @apiGroup home-advertise
 * @apiVersion 1.0.0
 * @apiName list
 * @apiParam {String} [name] 名称
 * @apiParam {Number} [type] 类型
 * @apiParam {String} [endTime] 结束时间
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
 * @apiSampleRequest /home/advertise/list
 */
router.get('/list', function (req, res, next) {
    let {name, type, endTime, pageNum, pageSize} = req.query;
    pageNum = pageNum ? pageNum : 1;
    pageSize = pageSize ? pageSize : 5;
    advertiseService.list(name, type, endTime, pageNum, pageSize)
        .then(value => res.json(result.pageSuccess(value)))
        .catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;