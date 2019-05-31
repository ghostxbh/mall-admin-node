/**
 * Create by xbh 2019-05-31 会员等级管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../model/common-result');
const mlService = require('../../service/member-level-service');
/**
 * @api {get} /memberLevel/list 获取所有权限列表
 * @apiGroup memberLevel
 * @apiVersion 1.0.0
 * @apiName list
 * @apiParam {Number} [defaultStatus] 默认状态
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
 * @apiSampleRequest /memberLevel/list
 */
router.get('/list', function (req, res, next) {
    let {defaultStatus} = req.query;
    mlService.list(defaultStatus).then(data => {
        if (data) res.json(result.success(data));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;