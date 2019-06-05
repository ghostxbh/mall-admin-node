/**
 * Create by xbh 2019-05-31 admin CRUD
 */
const Mysql = require('../../util/mysql-util');
const fields = `id,username,password,icon,email,nick_name as nickName,note,create_time as createTime,login_time as loginTime,status`;
const adminDao = {
    //增
    insert(admin) {
        let {username, password, icon, email, nickName, note, createTime, loginTime, status} = admin;
        let sql = `insert into ums_admin (username,password,icon,email,nick_name,note,create_time,login_time,status) values(?,?,?,?,?,?,?,?,?);`;
        let selectId = `SELECT LAST_INSERT_ID() as id;`;
        return Mysql.excute(sql + selectId, [username, password, icon, email, nickName, note, createTime, loginTime, status]);
    },
    //改
    update(admin) {
        let {id, username, password, icon, email, nickName, note, loginTime, status} = admin;
        let set = '';
        if (id) set += `id=${id},`;
        if (username) set += `username='${username}',`;
        if (password) set += `password='${password}',`;
        if (icon) set += `icon='${icon}',`;
        if (email) set += `email='${email}',`;
        if (nickName) set += `nick_name='${nickName}',`;
        if (note) set += `note='${note}',`;
        if (loginTime) set += `login_time='${loginTime}',`;
        if (status || status === 0) set += `status=${status},`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update ums_role set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //删
    delete(id) {
        let sql = `delete from ums_admin where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //登陆时间
    updateLoginTime(username, date) {
        let sql = `update ums_role set login_time=? where username=?`;
        return Mysql.transExcute(sql, [date, username]);
    },
    //重复查询
    repeat(username) {
        let sql = `select ${fields} from ums_admin where username=?`;
        return Mysql.fetch(sql, [username]);
    },
    //名称模糊查询
    listByName(name, pageSize, pageNum) {
        let where = `where username like '%${name}%' or nick_name like '%${name}%'`;
        let limit = `limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let sql = `select ${fields} from ums_admin ${where} ${limit};`;
        let count = `select count(*) as count from ums_admin ${where};`;
        return Mysql.fetch(sql + count);
    },
    //用户信息
    adminById(id) {
        let sql = `select ${fields} from ums_admin where id=?`;
        return Mysql.fetch(sql, [id]);
    },
};

module.exports = adminDao;