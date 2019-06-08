/**
 * Create by xbh 2019-06-05 优惠券管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../../model/common-result');
const couponService = require('../../../service/coupon/coupon-service');

/**
 * @api {post} /coupon/create 添加优惠券
 * @apiGroup coupon
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {Number} [type] 优惠卷类型；0->全场赠券；1->会员赠券；2->购物赠券；3->注册赠券
 * @apiParam {String} [name] 名称
 * @apiParam {Number} [platform] 使用平台：0->全部；1->移动；2->PC
 * @apiParam {Number} [count] 数量
 * @apiParam {Number} [amount] 金额
 * @apiParam {Number} [perLimit] 每人限领张数
 * @apiParam {Number} [minPoint] 使用门槛；0表示无门槛
 * @apiParam {String} [startTime] 开始时间
 * @apiParam {String} [endTime] 结束时间
 * @apiParam {Number} [useType] 使用类型：0->全场通用；1->指定分类；2->指定商品
 * @apiParam {String} [note] 备注
 * @apiParam {Number} [publishCount] 发行数量
 * @apiParam {Number} [useCount] 已使用数量
 * @apiParam {Number} [receiveCount] 领取数量
 * @apiParam {String} [enableTime] 可以领取的日期
 * @apiParam {String} [code] 优惠码
 * @apiParam {Number} [memberLevel] 可领取的会员类型：0->无限时
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
 * @apiSampleRequest /coupon/create
 */
router.post('/create', function (req, res, next) {
    let couponParam = req.body;
    couponService.create(couponParam).then(value => {
        if (value > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /coupon/update/{id} 修改优惠券
 * @apiGroup coupon
 * @apiVersion 1.0.0
 * @apiName update
 * @apiParam {Number} [id] ID
 * @apiParam {Number} [type] 优惠卷类型；0->全场赠券；1->会员赠券；2->购物赠券；3->注册赠券
 * @apiParam {String} [name] 名称
 * @apiParam {Number} [platform] 使用平台：0->全部；1->移动；2->PC
 * @apiParam {Number} [count] 数量
 * @apiParam {Number} [amount] 金额
 * @apiParam {Number} [perLimit] 每人限领张数
 * @apiParam {Number} [minPoint] 使用门槛；0表示无门槛
 * @apiParam {String} [startTime] 开始时间
 * @apiParam {String} [endTime] 结束时间
 * @apiParam {Number} [useType] 使用类型：0->全场通用；1->指定分类；2->指定商品
 * @apiParam {String} [note] 备注
 * @apiParam {Number} [publishCount] 发行数量
 * @apiParam {Number} [useCount] 已使用数量
 * @apiParam {Number} [receiveCount] 领取数量
 * @apiParam {String} [enableTime] 可以领取的日期
 * @apiParam {String} [code] 优惠码
 * @apiParam {Number} [memberLevel] 可领取的会员类型：0->无限时
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
 * @apiSampleRequest /coupon/update/:id
 */
router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    let couponParam = req.body;
    couponService.update(id, couponParam).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /coupon/delete/{id} 删除优惠券
 * @apiGroup coupon
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
 * @apiSampleRequest /coupon/delete/:id
 */
router.post('/delete/:id', function (req, res, next) {
    let {id} = req.params;
    couponService.delete(id).then(value => {
        if (value > 0) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /coupon/{id} 获取单个优惠券的详细信息
 * @apiGroup coupon
 * @apiVersion 1.0.0
 * @apiName coupon
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
 * @apiSampleRequest /coupon/:id
 */
router.get('/:id', function (req, res, next) {
    let {id} = req.params;
    couponService.coupon(id).then(value => {
        let [coupon] = value;
        res.json(result.success(coupon));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /coupon/list 根据优惠券名称和类型分页获取优惠券列表
 * @apiGroup coupon
 * @apiVersion 1.0.0
 * @apiName list
 * @apiParam {String} [name] 名称
 * @apiParam {Number} [type] 类型
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
 * @apiSampleRequest /coupon/list
 */
router.get('/list', function (req, res, next) {
    let {name, type, pageNum, pageSize} = req.query;
    pageNum = pageNum ? pageNum : 1;
    pageSize = pageSize ? pageSize : 5;
    couponService.list(name, type, pageNum, pageSize)
        .then(value => {
            if (value.status) res.json(result.pageSuccess(value.data));
            else res.json(result.failed(value.data));
        })
        .catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;