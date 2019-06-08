/**
 * Create by xbh 2019-06-06 优惠券领取记录管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../../model/common-result');
const couponHistoryService = require('../../../service/coupon/coupon-history-service');
/**
 * @api {get} /couponHistory/list 根据优惠券id，使用状态，订单编号分页获取领取记录
 * @apiGroup couponHistory
 * @apiVersion 1.0.0
 * @apiName list
 * @apiParam {Number} [couponId] 优惠卷ID
 * @apiParam {Number} [useStatus] 使用状态
 * @apiParam {String} [orderSn] 排序
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
 * @apiSampleRequest /couponHistory/list
 */
router.get('/list', function (req, res, next) {
    let {couponId, useStatus, orderSn, pageNum, pageSize} = req.query;
    pageNum = pageNum ? pageNum : 1;
    pageSize = pageSize ? pageSize : 5;
    couponHistoryService.list(couponId, useStatus, orderSn, pageNum, pageSize)
        .then(value => {
            if (value.status) {
                res.json(result.pageSuccess(value.data))
            } else {
                res.json(result.failed(value.data));
            }
        })
        .catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;