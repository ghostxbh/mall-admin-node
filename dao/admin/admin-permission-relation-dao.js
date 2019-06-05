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
};
module.exports = aprDao;