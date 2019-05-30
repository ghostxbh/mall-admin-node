/**
 * Create by xbh 2019-05-29
 */
const roleDao = require('../dao/role-dao');
const rprDao = require('../dao/role-permission-relation-dao');
const usService = {
    //添加角色
    create(role) {
        role.createTime = new Date();
        role.status = 1;
        role.adminCount = 0;
        role.sort = 0;
        return roleDao.insert(role);
    },
    //修改角色
    update(id, role) {
        role.id = id;
        return roleDao.update(role);
    },
    //批量删除
    delete: async (ids) => {
        let result = {status: true};
        for (let i = 0; i < ids.length; i++) {
            let {affectedRows} = await roleDao.delete(ids[i]);
            if (affectedRows < 1) {
                result.status = false;
                break;
            }
        }
        return Promise.resolve(result);
    },
    //获取权限相关角色列表
    permissionList(roleId) {
        return rprDao.permissionList(roleId);
    },
    //修改角色权限
    updatePermission: async (roleId, permissionIds) => {
        let result = {status: true};
        //删除旧权限
        let del = rprDao.deleteByRoleId(roleId);
        if (del.affectedRows > 0) {
            //添加新权限
            let paramList = permissionIds.map(permissionId => ({permissionId, roleId}));
            let data = await rprDao.insertList(paramList);
            if (!data) result.status = false;
        } else {
            result.status = false;
        }
        return Promise.resolve(result);
    },
    //获取角色列表
    list(){
        return roleDao.list();
    },
};

module.exports = usService;