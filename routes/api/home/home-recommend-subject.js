/**
 * Create by xbh 2019-06-05 首页专题推荐管理
 */
var express = require('express');
var router = express.Router();
const result = require('../../../model/common-result');
const recommendSubjectService = require('../../../service/home/home-recommend-subject-service');

/**
 * @api {post} /home/recommendSubject/create 添加首页推荐专题
 * @apiGroup home-recommendSubject
 * @apiVersion 1.0.0
 * @apiName create
 * @apiParam {Array} [homeBrandList] 列表
 * @apiParamExample {json} Request-Example:
 * [
 *      {
 *         "subjectId":1,
 *         "subjectName":"polo"
 *      },
 *      {
 *         "subjectId":2,
 *         "subjectName":"大牌手机"
 *      },
 * ]
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
 * @apiSampleRequest /home/recommendSubject/create
 */
router.post('/create', function (req, res, next) {
    let brandList = req.body;
    recommendSubjectService.create(brandList).then(value => {
        if (value) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /home/recommendSubject/update/sort/{id} 修改推荐排序
 * @apiGroup home-recommendSubject
 * @apiVersion 1.0.0
 * @apiName update-sort
 * @apiParam {Number} [id] ID
 * @apiParam {Number} [sort] sort
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
 * @apiSampleRequest /home/recommendSubject/update/sort/:id
 */
router.post('/update/sort/:id', function (req, res, next) {
    let {id} = req.params;
    let {sort} = req.query;
    recommendSubjectService.updateSort(id, sort).then(value => {
        let {affectedRows} = value;
        if (affectedRows > 0) {
            res.json(result.success(affectedRows));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /home/recommendSubject/delete 批量删除推荐
 * @apiGroup home-recommendSubject
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
 * @apiSampleRequest /home/recommendSubject/delete
 */
router.post('/delete', function (req, res, next) {
    let {ids} = req.query;
    recommendSubjectService.delete(ids).then(value => {
        if (value > 0) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {post} /home/recommendSubject/update/recommendStatus 批量修改推荐状态
 * @apiGroup home-recommendSubject
 * @apiVersion 1.0.0
 * @apiName update-recommendStatus
 * @apiParam {Array} [ids] IDS
 * @apiParam {Number} [recommendStatus] 状态
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
 * @apiSampleRequest /home/recommendSubject/update/recommendStatus
 */
router.post('/update/recommendStatus', function (req, res, next) {
    let {ids, recommendStatus} = req.query;
    recommendSubjectService.updateRecommendStatus(ids, recommendStatus).then(value => {
        if (value > 0) {
            res.json(result.success(value));
        } else res.json(result.failed());
    }).catch(e => res.json(result.exceptionFailed(e.message)));
});

/**
 * @api {get} /home/recommendSubject/list 分页查询推荐
 * @apiGroup home-recommendSubject
 * @apiVersion 1.0.0
 * @apiName list
 * @apiParam {String} [subjectName] 专题名称
 * @apiParam {Number} [recommendStatus] 状态
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
 * @apiSampleRequest /home/recommendSubject/list
 */
router.get('/list', function (req, res, next) {
    let {subjectName, recommendStatus, pageNum, pageSize} = req.query;
    pageNum = pageNum ? pageNum : 1;
    pageSize = pageSize ? pageSize : 5;
    recommendSubjectService.list(subjectName, recommendStatus, pageNum, pageSize)
        .then(value => res.json(result.pageSuccess(value)))
        .catch(e => res.json(result.exceptionFailed(e.message)));
});

module.exports = router;