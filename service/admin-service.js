/**
 * Create by xbh 2019-05-31 admin账户相关
 */
const adminDao = require('../dao/admin-dao');
const allDao = require('../dao/admin-login-log-dao');
const arrDao = require('../dao/admin-role-relation-dao');
const aprDao = require('../dao/admin-permission-relation-dao');
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
            let token = jwt.sign({username: username}, doc.jwt.secret, {expiresIn: doc.jwt.expiration});
            console.log('token生成：%s', token);
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
    //TODO 刷新token
    refreshToken(oldToken) {
        let result = {status: true};
        result.data = oldToken.substring(doc.jwt.tokenHead.length);
        return Promise.resolve(result);
    },
    //用户信息
    admin: async (token) => {
        let user = jwt.verify(token, doc.jwt.secret);
        let admin = await adminDao.repeat(user.username);
        console.log('获取用户信息 %s', user.username);
        return Promise.resolve(admin)
    },
    //列表
    list: async (name, pageSize, pageNum) => {
        //处理字符串问题
        if (typeof pageSize === "string") pageSize = parseInt(pageSize);
        if (typeof pageNum === "string") pageNum = parseInt(pageNum);
        //配置分页数据
        let result = {status: true, data: {pageSize, pageNum}};
        let [list, [total]] = adminDao.listByName(name, pageSize, pageNum);
        if (list) {
            result.data.list = list;
            result.data.total = total.count;
            result.data.totalPage = Math.ceil(total.count / pageSize);
        } else {
            result.status = false;
            result.data = '查询列表失败';
        }
        return Promise.resolve(data);
    },
    //用户信息
    adminById(id) {
        return adminDao.adminById(id);
    },
    //改
    update(id, admin) {
        admin.id = id;
        return adminDao.update(admin);
    },
    //删
    delete: async (id) => {
        let result = {status: true};
        let {affectedRows} = await adminDao.delete(id);
        if (affectedRows > 0) result.data = affectedRows;
        else {
            result.status = false;
            result.data = '删除失败';
        }
        return result;
    },
    //修改用户下角色信息
    updateRole: async (adminId, roleIds) => {
        //删除旧关联
        arrDao.deleteByAdminId(adminId);
        let list = [];
        roleIds.map(x => list.push({adminId, roleId: x}));
        let {affectedRows} = await arrDao.insertList(list);
        return Promise.resolve(affectedRows);
    },
    //获取用户下的角色列表
    roleList(adminId) {
        return arrDao.roleList(adminId);
    },
    //修改用户下的权限
    updatePermission: async (adminId, permissionIds) => {
        //删除旧关联
        aprDao.deleteByAdminId(adminId);
        let permissionList = await arrDao.rolePermissionList(adminId);
        let rolePermissionList = permissionList.filter(x => x.id);
        let list = [];
        if (permissionIds) {
            //筛选+权限
            let addPermissionIdList = permissionIds.filter(x => rolePermissionList.indexOf(x) < 0);
            //筛选-权限
            let subPermissionIdList = permissionList.filter(x => permissionIds.indexOf(x) < 0);
            list.splice(mlService.convert(adminId, 1, addPermissionIdList));
            list.splice(mlService.convert(adminId, -1, subPermissionIdList));
            return aprDao.insertList(list);
        }
        return 0;
    },
    //筛选
    convert(adminId, type, permissionIdList) {
        let list = [];
        let relation = {adminId, type};
        permissionIdList.map(x => {
            let permission = {...relation};
            permission.permissionId = x;
            list.push(permission);
        });
        return list;
    },
};
module.exports = mlService;