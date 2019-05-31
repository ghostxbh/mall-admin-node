/**
 * Create by xbh 2019-05-31 admin账户相关
 */
const adminDao = require('../dao/admin-dao');
const allDao = require('../dao/admin-login-log-dao');
const account = require('../util/account-util');
const jwt = require('jsonwebtoken');
const doc = require('../conf/doc');

const mlService = {
    //注册
    register: async (admin) => {
        let result = {status: true};
        admin.createTime = new Date();
        admin.status = 1;
        //用户名验证
        let [data] = await adminDao.repeat(admin.username);
        if (data) {
            result.status = false;
            result.data = '用户名已存在';
            return result;
        }
        //密码加盐
        admin.password = account.md5(admin.password);
        console.log(admin.password);
        let [{affectedRows}] = await adminDao.insert(admin);
        if (affectedRows > 0) result.data = 'ok';
        else {
            result.status = false;
            result.data = '注册失败';
        }
        return result;
    },
    //登陆
    login: async (req, username, password) => {
        let result = {status: true};
        let [admin] = await adminDao.repeat(username);
        let MD5 = account.md5(password);
        console.log(MD5);
        if (admin.password !== MD5) {
            result.status = false;
            result.data = '密码不正确';
        } else {
            //加密admin - token
            let token = jwt.sign({foo: 'bar'}, admin);
            mlService.updateLoginTime(admin.username);
            mlService.insertLoginLog(req, admin);
            result.data = token;
        }
        return result;
    },
    //登陆时间
    updateLoginTime(username) {
        let date = new Date();
        return adminDao.updateLoginTime(username, date);
    },
    //添加登录记录
    insertLoginLog(req, admin) {
        let ip = account.getClientIp(req);
        let createTime = new Date();
        let loginLog = {ip, createTime, adminId: admin.id};
        return allDao.insert(loginLog);
    },
    refreshToken(oldToken) {
        let result = {status: true};
        let token = oldToken.substring(doc.jwt.tokenHead.length);

    },
};
module.exports = mlService;