/**
 * Create by xbh 2019-06-05
 */
const Mysql = require('../../util/mysql-util');
let field = `id,title,start_date,end_date,status,create_time`;
module.exports = {
    //增
    insert(promotion) {
        let {title, startDate, endDate, status, createTime} = promotion;
        let sql = `insert into sms_flash_promotion(title,start_date,end_date,status,create_time)values(?,?,?,?,?)`;
        return Mysql.excute(sql, [title, startDate, endDate, status, createTime]);
    },
    //改
    update(promotion) {
        let {id, title, startDate, endDate, status} = promotion;
        let set = '';
        if (id) set += `id=${id},`;
        if (title) set += `title='${title}',`;
        if (startDate) set += `start_date='${startDate}',`;
        if (endDate) set += `end_date='${endDate}',`;
        if (status) set += `status=${status}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update sms_flash_promotion set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //删
    delete(id) {
        let sql = `delete from sms_flash_promotion where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //详情
    promotion(id) {
        let sql = `select ${field} from sms_flash_promotion where id=?`;
        return Mysql.fetch(sql, [id]);
    },
    //列表
    list(keyword, pageNum, pageSize) {
        let where = `where title like '%${keyword}%'`;
        let limit = `limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let sql = `select ${field} from sms_flash_promotion ${where} ${limit}`;
        return Mysql.fetch(sql);
    },
};