/**
 * Create by xbh 2019-06-03
 */
const Mysql = require('../util/mysql-util');
const fields = `id, admin_id, role_id`;
const arrDao = {
    //删除admin旧关联
    deleteByAdminId(adminId) {
        let sql = `delete from ums_admin_role_relation where admin_id=?`;
        return Mysql.transExcute(sql, [adminId]);
    },
    //添加新admin-role
    insertList(list) {
        let value = list.map(x => `(${x.adminId},${x.roleId})`).join(',');
        let sql = `insert into ums_admin_role_relation (admin_id, role_id) values(${value})`;
        return Mysql.excute(sql);
    },
    //角色列表
    roleList(adminId) {
        let sql = `select r.* from ums_admin_role_relation ar left join ums_role r on ar.role_id=r.id where ar.admin_id=?`;
        return Mysql.fetch(sql, [adminId]);
    },
    //用户所有角色权限
    rolePermissionList(adminId) {
        let left = `left join ums_role r on ar.role_id = r.id left join ums_role_permission_relation rp on r.id = rp.role_id left join ums_permission p on rp.permission_id=p.id`;
        let sql = `select p.* from ums_admin_role_relation ar ${left} where ar.admin_id =? and p.id is not null`;
        return Mysql.fetch(sql, [adminId]);
    },
};
module.exports = arrDao;