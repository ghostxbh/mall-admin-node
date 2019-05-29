/**
 * Create by xbh 2019-05-29 role CRUD
 */
const Mysql = require('../util/mysql-util');

const roleDao = {
    //增
    insert(role) {
        let {name, description, adminCount, createTime, status, sort} = role;
        let sql = `insert into ums_role (name, description, admin_count,create_time, status, sort) values (?,?,?,?,?,?);`;
        let selectId = `SELECT LAST_INSERT_ID() as id;`;
        return Mysql.excute(sql + selectId, [name, description, adminCount, createTime, status, sort]);
    },
    //改
    update(role) {
        let {id, name, description, adminCount, status, sort} = role;
        let set = '';
        if (id) set += `id=${id},`;
        if (name) set += `name='${name}',`;
        if (description) set += `description='${description}',`;
        if (adminCount || adminCount === 0) set += `admin_count=${adminCount},`;
        if (status) set += `status=${status},`;
        if (sort || sort === 0) set += `sort=${sort}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update ums_role set ${set} where id=${id}`;
        return Mysql.excute(sql);
    },
    //删
    delete(id) {
        let sql = `delete from ums_role where id=?`;
        return Mysql.excute(sql, [id]);
    },
};

module.exports = roleDao;