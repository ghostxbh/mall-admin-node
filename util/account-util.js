/**
 * Create by xbh 2019-05-31 账户工具相关
 */
const crypto = require('crypto');
const doc = require('../conf/doc');

/**
 * MD5密码盐
 * @param pwd
 * @return {string}
 */
function md5(pwd) {
    let data = `${pwd}:${doc.salt}`;//加盐
    return crypto.createHash('md5').update(data.toString()).digest('hex');
}

/**
 * 获取IP
 * @param req
 * @return {*|string}
 */
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

module.exports = {md5, getClientIp};
