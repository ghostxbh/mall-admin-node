/**
 * Create by xbh 2019-06-05
 */
const Mysql = require('../../util/mysql-util');
let field = `id,name,start_time,end_time,status,create_time`;
module.exports = {
    //增
    insert(promotionSession) {
        let {name, startTime, endTime, status, createTime} = promotionSession;
        let sql = `insert into sms_flash_promotion_session(name,start_time,end_time,status,create_time)values(?,?,?,?,?)`;
        return Mysql.excute(sql, [name, startTime, endTime, status, createTime]);
    },
    //改
    update(promotionSession) {
        let {id, name, startTime, endTime, status} = promotionSession;
        let set = '';
        if (id) set += `id=${id},`;
        if (name) set += `name='${name}',`;
        if (startTime) set += `start_time='${startTime}',`;
        if (endTime) set += `end_time='${endTime}',`;
        if (status) set += `status=${status}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update sms_flash_promotion_session set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //删
    delete(id) {
        let sql = `delete from sms_flash_promotion_session where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //详情
    promotionSession(id) {
        let sql = `select ${field} from sms_flash_promotion_session where id=?`;
        return Mysql.fetch(sql, [id]);
    },
    //列表
    list() {
        let sql = `select ${field} from sms_flash_promotion_session`;
        return Mysql.fetch(sql);
    },
    //状态列表
    listByStatus(status) {
        let sql = `select ${field} from sms_flash_promotion_session where status=?`;
        return Mysql.fetch(sql, [status]);
    },
};