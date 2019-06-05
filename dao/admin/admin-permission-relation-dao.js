/**
 * Create by xbh 2019-06-03
 */
const Mysql = require('../../util/mysql-util');
const fields = `id,admin_id,permission_id,type`;
const aprDao = {
    //删除用户相关权限
    deleteByAdminId(adminId) {
        let sql = `delete from ums_admin_permission_relation where admin_id=?`;
        return Mysql.transExcute(sql, [adminId]);
    },
    //批量插入
    insertList(list) {
        let value = list.map(x => `(${x.adminId},${x.permissionId},${x.type})`).join(',');
        let sql = `insert into ums_admin_permission_relation (admin_id, permission_id, type) values(${value})`;
        return Mysql.excute(sql);
    },
    //权限列表
    permissionList(adminId) {
        let pid = `select p.id from ums_admin_permission_relation pr left join ums_permission p on pr.permission_id=p.id where pr.type=-1 and pr.admin_id=${adminId}`;
        let where = `where ar.admin_id=${adminId} and p.id is not null and p.id not in (${pid})`;
        let from = `from ums_admin_role_relation ar left join ums_role r on ar.role_id = r.id left join ums_role_permission_relation rp on r.id = rp.role_id left join ums_permission p on rp.permission_id = p.id`;
        let union = `union select p.* from ums_admin_permission_relation pr left join ums_permission p on pr.permission_id = p.id where pr.type = 1 and pr.admin_id=${adminId}`;
        let sql = `select p.* ${from} ${where} ${union}`;
        return Mysql.fetch(sql);
    },
};
module.exports = aprDao;