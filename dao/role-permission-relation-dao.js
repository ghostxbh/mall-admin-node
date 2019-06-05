/**
 * Create by xbh 2019-05-30 ums_role_permission_relation表CURD
 */
const Mysql = require('../util/mysql-util');

const rolePermissionRelationDao = {
    insertList(list) {
        let value = list.map(x => `(${x.roleId},${x.permissionId})`).join(',');
        let sql = `insert into ums_role_permission_relation (role_id, permission_id) values (${value})`;
        return Mysql.excute(sql);
    },
    permissionList(roleId) {
        let sql = `select p.* from ums_role_permission_relation r left join ums_permission p on r.permission_id = p.id where r.role_id=?;`;
        return Mysql.fetch(sql, [roleId]);
    },
    deleteByRoleId(roleId) {
        let sql = `delete from ums_role_permission_relation where role_id=?`;
        return Mysql.transExcute(sql, [roleId]);
    },
};

module.exports = rolePermissionRelationDao;