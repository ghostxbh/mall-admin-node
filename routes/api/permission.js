/**
 * Create by xbh 2019-05-30 后台用户权限管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../model/common-result');
const permissionService = require('../../service/permission-service');

/**
 * @api {post} /permission/create 添加权限
 * @apiGroup permission
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {Number} [pid] 父级ID
 * @apiParam {String} [name] 名称
 * @apiParam {String} [value] 权限值
 * @apiParam {String} [icon] 图标
 * @apiParam {Number} [type] 权限类型：0-目录；1-菜单；2-按钮（接口绑定权限）
 * @apiParam {String} [uri] 前端资源路径
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
 * @apiSampleRequest /permission/create
 */
router.post('/create', function (req, res, next) {
    let permission = req.body;
    permissionService.create(permission).then(data => {
        let [{affectedRows}] = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /permission/update/:id 修改权限
 * @apiGroup permission
 * @apiVersion 1.0.0
 * @apiName update
 * @apiParam {Number} [id] ID
 * @apiParam {Number} [pid] 父级ID
 * @apiParam {String} [name] 名称
 * @apiParam {String} [value] 权限值
 * @apiParam {String} [icon] 图标
 * @apiParam {Number} [type] 权限类型：0-目录；1-菜单；2-按钮（接口绑定权限）
 * @apiParam {String} [uri] 前端资源路径
 * @apiParam {Number} [status] 启用状态；0-禁用；1-启用
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
 * @apiSampleRequest /permission/update/:id
 */
router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    let permission = req.body;
    permissionService.update(id, permission).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /permission/delete 根据id批量删除权限
 * @apiGroup permission
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
 * @apiSampleRequest /permission/delete
 */
router.post('/delete', function (req, res, next) {
    let ids = req.body;
    permissionService.delete(ids).then(data => {
        let {status} = data;
        if (status) res.json(result.success(1));
        else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /permission/treeList 以层级结构返回所有权限
 * @apiGroup permission
 * @apiVersion 1.0.0
 * @apiName treeList
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
 * @apiSampleRequest /permission/treeList
 */
router.get('/treeList', function (req, res, next) {
    permissionService.treeList().then(data => {
        if (data) res.json(result.success(data));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /permission/list 获取所有权限列表
 * @apiGroup permission
 * @apiVersion 1.0.0
 * @apiName list
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
 * @apiSampleRequest /permission/list
 */
router.get('/list', function (req, res, next) {
    permissionService.list().then(data => {
        if (data) res.json(result.success(data));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;