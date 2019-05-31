/**
 * Create by xbh 2019-05-30 permission CRUD
 */
const Mysql = require('../util/mysql-util');

const permissionDao = {
    insert(permission) {
        let {pid, name, value, icon, type, uri, status, createTime, sort} = permission;
        let sql = `insert into ums_permission (pid,name,value,icon,type,uri,status,create_time,sort)values(?,?,?,?,?,?,?,?,?);`;
        let selectId = `SELECT LAST_INSERT_ID() as id;`;
        return Mysql.excute(sql + selectId, [pid, name, value, icon, type, uri, status, createTime, sort]);
    },
    update(id, permission) {
        let {pid, name, value, icon, type, uri, status, sort} = permission;
        let set = '';
        if (id) set += `id=${id},`;
        if (pid) set += `pid=${pid},`;
        if (name) set += `name='${name}',`;
        if (value) set += `value='${value}',`;
        if (icon) set += `icon='${icon}',`;
        if (type || type === 0) set += `type=${type},`;
        if (uri) set += `uri='${uri}',`;
        if (status || status === 0) set += `status=${status},`;
        if (sort || sort === 0) set += `sort=${sort}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update ums_permission set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    delete(id) {
        let sql = `delete from ums_permission where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    list() {
        let sql = `select id,pid,name,value,icon,type,uri,status,create_time,sort from ums_permission order by id asc`;
        return Mysql.fetch(sql);
    }
};

module.exports = permissionDao;