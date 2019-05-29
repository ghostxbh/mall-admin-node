/**
 * Create by xbh 2019-05-29 后台用户角色管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../model/common-result');
const roleService = require('../../service/role-service');
const package = require('../../package');
/**
 * @api {post} /role/create 添加角色信息
 * @apiGroup role
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {String} [name] 名称
 * @apiParam {String} [description] 描述
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
 * @apiSampleRequest http://localhost:3000/role/create
 */
router.post('/create', function (req, res, next) {
    let role = req.body;
    roleService.create(role).then(data => {
        let [{affectedRows}] = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /role/update/{id} 修改角色信息
 * @apiGroup role
 * @apiVersion 1.0.0
 * @apiName update
 * @apiParam {Number} [id] id
 * @apiParam {Object} [role] 角色信息{name, description, adminCount, createTime, status, sort}
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
 */
router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    let role = req.body;
    roleService.update(id, role).then(data => {
        let {affectedRows} = data;
        if (affectedRows > 0) res.json(result.success(affectedRows));
        else res.json(result.failed);
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /role/delete 批量删除角色
 * @apiGroup role
 * @apiVersion 1.0.0
 * @apiName delete
 * @apiParam {Array} [ids] ids
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
 *  "data":Array
 * }
 */
router.post('/delete', function (req, res, next) {
    let {ids} = req.query;
    roleService.update(ids).then(data => {
        let {status, list} = data;
        if (status) res.json(result.success(1));
        else res.json(result.failed(list));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /permission/{roleId} 获取相应角色权限
 * @apiGroup role
 * @apiVersion 1.0.0
 * @apiName permission
 * @apiParam {Number} [roleId] 角色ID
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
 *  "data":Array
 * }
 */
router.get('/permission/:roleId', function (req, res, next) {
    let {roleId} = req.params;
    roleService.update(ids).then(data => {
        let {status, list} = data;
        if (status) res.json(result.success(1));
        else res.json(result.failed(list));
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;