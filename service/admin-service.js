/**
 * Create by xbh 2019-05-31 admin账户相关
 */
const adminDao = require('../dao/admin-dao');
const account = require('../util/account-util');
const jwt = require('jsonwebtoken');

const mlService = {
    //注册
    register: async (admin) => {
        let result = {status: true};
        admin.createTime = new Date();
        admin.status = 1;
        //用户名验证
        let data = adminDao.repeat(admin.username);
        if (data) {
            result.status = false;
            result.data = '用户名已存在';
            return result;
        }
        //密码加盐
        admin.password = account.md5(admin.password);
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
        let admin = await adminDao.repeat(username);
        let MD5 = account.md5(password);
        if (admin.password !== MD5) {
            result.status = false;
            result.data = '密码不正确';
        } else {
            //加密admin - token
            let token = jwt.sign({foo: 'bar'}, admin);
            mlService.updateLoginTime(admin.username);
        }
    },
    //登陆时间
    updateLoginTime(username) {
        let date = new Date();
        return adminDao.updateLoginTime(username, date);
    },
    //添加登录记录
    insertLoginLog(req, admin) {

    },
};
module.exports = mlService;