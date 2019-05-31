/**
 * Create by xbh 2019-05-30 permission 业务
 */
const permissionDao = require('../dao/permission-dao');

const permissionService = {
    //增
    create(permission) {
        permission.status = 1;
        permission.createTime = new Date();
        permission.sort = 0;
        return permissionDao.insert(permission);
    },
    //改
    update(id, permission) {
        return permissionDao.update(id, permission);
    },
    //批量删除
    delete: async (ids) => {
        let result = {status: true};
        for (let i = 0; i < ids.length; i++) {
            let {affectedRows} = await permissionDao.delete(ids[i]);
            if (affectedRows < 1) {
                result.status = false;
                break;
            }
        }
        return Promise.resolve(result);
    },
    //树形列表
    treeList: async () => {
        let list = await permissionDao.list();
        let result = list.filter(x => x.pid === 0);
        result.map(x => permissionService.tree(x, list));
        return Promise.resolve(result);
    },
    //列表
    list() {
        return permissionDao.list();
    },
    //树
    tree(param, list) {
        let arr = list.filter(x => x.pid === param.id);
        param.children = arr || [];
        arr.map(x => permissionService.tree(x, list));
    },
};

module.exports = permissionService;