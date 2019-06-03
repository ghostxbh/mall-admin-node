/**
 * Create by xbh 2019-05-31
 */
const Mysql = require('../util/mysql-util');
const fields = `id, admin_id, create_time, ip, address, user_agent`;

const allDao = {
    //增
    insert(loginLog) {
        let {adminId, createTime, ip, address, userAgent} = loginLog;
        let sql = `insert into ums_admin_login_log (admin_id,create_time,ip,address,user_agent) values(?,?,?,?,?);`;
        let selectId = `SELECT LAST_INSERT_ID() as id;`;
        return Mysql.excute(sql + selectId, [adminId, createTime, ip, address, userAgent]);
    },
};

module.exports = allDao;