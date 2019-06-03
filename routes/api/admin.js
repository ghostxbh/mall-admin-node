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
router.get('/token/refresh', function (req, res, next) {
    let token = req.headers[jwt.tokenHeader];
    adminService.refreshToken(token).then(value => {
        if (value.status) {
            let tokenMap = new Map();
            tokenMap.set("token", value.data);
            tokenMap.set("tokenHead", jwt.tokenHead);
            res.json(result.success(tokenMap));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /admin/info 获取当前登录用户信息
 * @apiGroup admin
 * @apiVersion 1.0.0
 * @apiName info
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
 * @apiSampleRequest /admin/info
 */
router.get('/info', function (req, res, next) {
    let token = req.headers[jwt.tokenHeader];
    adminService.admin(token).then(value => {
        if (value.status) {
            let data = new Map();
            data.set("username", value.username);
            data.set("roles", ['TEST']);
            data.set('icon', value.icon);
            res.json(result.success(data));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /admin/logout 登出功能
 * @apiGroup admin
 * @apiVersion 1.0.0
 * @apiName logout
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
 * @apiSampleRequest /admin/logout
 */
router.post('/logout', function (req, res, next) {
    res.json(result.success('ok'));
});

/**
 * @api {get} /admin/list 根据用户名或姓名分页获取用户列表
 * @apiGroup admin
 * @apiVersion 1.0.0
 * @apiName list
 * @apiParam {String} [name] 用户名/昵称
 * @apiParam {Number} [pageSize] 条数
 * @apiParam {Number} [pageNum] 页数
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
 * @apiSampleRequest /admin/list
 */
router.get('/list', function (req, res, next) {
    let {name, pageSize, pageNum} = req.query;
    adminService.list(name, pageSize, pageNum).then(value => {
        if (value.status) {
            res.json(result.pageSuccess(value.data));
        } else res.json(result.failed(value.data));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /admin/{id} 获取指定用户信息
 * @apiGroup admin
 * @apiVersion 1.0.0
 * @apiName id
 * @apiParam {Number} [id] ID
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
 * @apiSampleRequest /admin/:id
 */
router.get('/:id', function (req, res, next) {
    let {id} = req.params;
    adminService.adminById(id).then(value => {
        res.json(result.success(value));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /admin/update/{id} 修改指定用户信息
 * @apiGroup admin
 * @apiVersion 1.0.0
 * @apiName update
 * @apiParam {Number} [id] ID
 * @apiParam {String} [username] 用户名
 * @apiParam {String} [password] 用户名
 * @apiParam {String} [icon] 头像链接地址
 * @apiParam {String} [email] 邮箱
 * @apiParam {String} [nickName] 昵称
 * @apiParam {String} [note] 备注信息
 * @apiParam {Number} [status] 帐号启用状态
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
 * @apiSampleRequest /admin/update/:id
 */
router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    let admin = req.body;
    adminService.update(id, admin).then(value => {
        if (value) {
            res.json(result.pageSuccess(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /admin/delete/{id} 修改指定用户信息
 * @apiGroup admin
 * @apiVersion 1.0.0
 * @apiName delete
 * @apiParam {Number} [id] ID
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
 * @apiSampleRequest /admin/delete/:id
 */
router.post('/delete/:id', function (req, res, next) {
    let {id} = req.params;
    adminService.delete(id).then(value => {
        if (value) {
            res.json(result.pageSuccess(value.data));
        } else res.json(result.failed(value.data));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /admin/role/update 给用户分配角色
 * @apiGroup admin
 * @apiVersion 1.0.0
 * @apiName role-update
 * @apiParam {Number} [adminId] adminId
 * @apiParam {Array} [roleIds] 角色ID组
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
 * @apiSampleRequest /admin/role/update
 */
router.post('/role/update', function (req, res, next) {
    let {adminId, roleIds} = req.query;
    adminService.updateRole(adminId, roleIds).then(value => {
        if (value) {
            res.json(result.pageSuccess(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /admin/role/{adminId} 获取指定用户的角色
 * @apiGroup admin
 * @apiVersion 1.0.0
 * @apiName role-adminId
 * @apiParam {Number} [adminId] adminId
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
 * @apiSampleRequest /admin/role/:adminId
 */
router.get('/role/:adminId', function (req, res, next) {
    let {adminId} = req.params;
    adminService.roleList(adminId).then(value => {
        if (value) {
            res.json(result.pageSuccess(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /admin/permission/update 获取指定用户的角色
 * @apiGroup admin
 * @apiVersion 1.0.0
 * @apiName permission-update
 * @apiParam {Number} [adminId] adminId
 * @apiParam {Array} [permissionIds] permissionIds
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
 * @apiSampleRequest /admin/permission/update
 */
router.post('/permission/update', function (req, res, next) {
    let {adminId, permissionIds} = req.query;
    adminService.updatePermission(adminId, permissionIds).then(value => {
        if (value) {
            res.json(result.pageSuccess(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});
module.exports = router;