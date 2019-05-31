/**
 * Create by xbh 2019-05-31 后台用户管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../model/common-result');
const adminService = require('../../service/admin-service');
const jwt = require('../../conf/doc').jwt;
/**
 * @api {post} /admin/register 注册
 * @apiGroup admin
 * @apiVersion 1.0.0
 * @apiName register
 * @apiParam {String} [username] 用户名
 * @apiParam {String} [password] 用户名
 * @apiParam {String} [icon] 头像链接地址
 * @apiParam {String} [email] 邮箱
 * @apiParam {String} [nickName] 昵称
 * @apiParam {String} [note] 备注信息
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
 * @apiSampleRequest /admin/register
 */
router.post('/register', function (req, res, next) {
    let admin = req.body;
    adminService.register(admin).then(data => {
        if (data.status) res.json(result.success(data.data));
        else res.json(result.failed(data.data));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /admin/login 登录=>token
 * @apiGroup admin
 * @apiVersion 1.0.0
 * @apiName login
 * @apiParam {String} [username] 用户名
 * @apiParam {String} [password] 密码
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "message": "操作成功",
 *  "data": Map
 * }
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 error
 * {
 *  "code": 500,
 *  "message": "操作失败",
 * }
 * @apiSampleRequest /admin/login
 */
router.post('/login', function (req, res, next) {
    let {username, password} = req.body;
    adminService.login(username, password).then(value => {
        if (value.status) {
            let tokenMap = new Map();
            tokenMap.set("token", value.data);
            tokenMap.set("tokenHead", jwt.tokenHead);
            res.json(result.success(tokenMap));
        } else res.json(result.failed(value.data));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /admin/token/refresh 刷新token
 * @apiGroup admin
 * @apiVersion 1.0.0
 * @apiName refresh
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "message": "操作成功",
 *  "data": Map
 * }
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 error
 * {
 *  "code": 500,
 *  "message": "操作失败",
 * }
 * @apiSampleRequest /admin/token/refresh
 */
router.post('/token/refresh', function (req, res, next) {
    let token = req.headers[jwt.tokenHeader];
    adminService.refreshToken(token).then(value => {
        if (value.status) {
            let tokenMap = new Map();
            tokenMap.set("token", value.data);
            tokenMap.set("tokenHead", jwt.tokenHead);
            res.json(result.success(tokenMap));
        } else res.json(result.failed(value.data));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});
module.exports = router;