/**
 * Create by xbh 2019-05-28 通用返回对象
 */
//操作成功
const SUCCESS = 200;
//操作失败
const FAILED = 500;
//操作失败,异常编码
const EXCEPTION = 505;
//参数校验失败
const VALIDATE_FAILED = 404;
//未认证
const UNAUTHORIZED = 401;
//未授权
const FORBIDDEN = 403;
//返回结果
const resultlt_data = {code: 0, message: ''};

/**
 * 普通成功返回
 * @param data
 * @return {{code, message}&{data: *}}
 */
function success(data) {
    let result = {...resultlt_data, data};
    result.code = SUCCESS;
    result.message = '操作成功';
    return result;
}

/**
 * 返回分页成功数据
 * @param data
 * @return {{code, message}}
 */
function pageSuccess(data) {
    let result = {...resultlt_data};
    result.code = SUCCESS;
    result.message = '操作成功';
    let map = new Map();
    map.set('pageSize', data.pageSize);
    map.set('totalPage', data.pages);
    map.set('total', data.total);
    map.set('pageNum', data.pageNum);
    map.set('list', data.list);
    result.data = map;
    return result;
}

/**
 * 普通失败提示信息
 * @return {{code, message}}
 */
function failed(data) {
    let result = {...resultlt_data};
    result.code = FAILED;
    result.message = '操作失败';
    if (data) result.data = data;
    return result;
}

/**
 * 异常失败提示信息
 * @return {{code, message}}
 */
function exceptionFailed(message) {
    let result = {...resultlt_data};
    result.code = EXCEPTION;
    result.message = message;
    return result;
}

/**
 * 参数验证失败使用
 * @param message 错误信息
 * @return {{code, message}}
 */
function validateFailed(message) {
    let result = {...resultlt_data};
    result.code = VALIDATE_FAILED;
    result.message = message;
    return result;
}

/**
 * 未登录时使用
 * @param message 错误信息
 * @return {{code, message}}
 */
function unauthorized(message) {
    let result = {...resultlt_data};
    result.code = UNAUTHORIZED;
    result.message = '暂未登录或token已经过期';
    result.data = message;
    return result;
}

/**
 * 未授权时使用
 * @param message 错误信息
 * @return {{code, message}}
 */
function forbidden(message) {
    let result = {...resultlt_data};
    result.code = FORBIDDEN;
    result.message = '没有相关权限';
    result.data = message;
    return result;
}

/**
 * 参数验证失败使用
 * @param message 错误信息
 * @return {{code, message}}
 */
/*
function forbidden(message) {
    let result = {...resultlt_data};
    result.code = UNAUTHORIZED;
    result.message = '没有相关权限';
    result.data = message;
    return result;
}*/

module.exports = {
    success,
    pageSuccess,
    failed,
    exceptionFailed,
    validateFailed,
    unauthorized,
    forbidden,
};