/**
 * Create by xbh 2019-06-05
 */
const Mysql = require('../../util/mysql-util');
let field = `id,name,type,pic,start_time,end_time,status,click_count,order_count,url,note,sort`;
module.exports = {
    //增
    insert(advertise) {
        let {name, type, pic, startTime, endTime, status, clickCount, orderCount, url, note, sort} = advertise;
        let sql = `insert into sms_home_advertise(name,type,pic,start_time,end_time,status,click_count,order_count,url,note,sort)values(?,?,?,?,?,?,?,?,?,?,?)`;
        return Mysql.excute(sql, [name, type, pic, startTime, endTime, status, clickCount, orderCount, url, note, sort]);
    },
    //改
    update(advertise) {
        let {id, name, type, pic, startTime, endTime, status, clickCount, orderCount, url, note, sort} = advertise;
        let set = '';
        if (id) set += `id=${id},`;
        if (name) set += `name='${name}',`;
        if (type) set += `type=${type},`;
        if (pic) set += `pic='${pic}',`;
        if (startTime) set += `start_time='${startTime}',`;
        if (endTime) set += `end_time='${endTime}',`;
        if (status) set += `status=${status},`;
        if (clickCount) set += `click_count=${clickCount},`;
        if (orderCount) set += `order_count=${orderCount},`;
        if (url) set += `url='${url}',`;
        if (note) set += `note='${note}',`;
        if (sort) set += `sort=${sort}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update sms_home_advertise set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //删
    delete(id) {
        let sql = `delete from sms_home_advertise where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //详情
    advertise(id) {
        let sql = `select ${field} from sms_home_advertise where id=?`;
        return Mysql.fetch(sql, [id]);
    },
    //列表
    list(name, type, endStart, endEnd, pageNum, pageSize) {
        let where = `where 1=1`;
        if (name) where += ` and name like '%${name}%'`;
        if (type) where += ` and type=${type}`;
        if (endStart && endEnd) where += ` and (end_time between ${endStart} and ${endEnd})`;
        let order = `order by sort desc`;
        let limit = `limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let count = `select count(*) as count from sms_home_advertise ${where}`;
        let sql = `select ${field} from sms_home_advertise ${where} ${order} ${limit};`;
        return Mysql.fetch(sql + count);
    },
};