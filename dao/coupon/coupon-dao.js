/**
 * Create by xbh 2019-06-05
 */
const Mysql = require('../../util/mysql-util');
let field = 'id,type,name,platform,count,amount,per_limit,min_point,start_time,end_time,' +
    'use_type,note,publish_count,use_count,receive_count,enable_time,code,member_level';
module.exports = {
    //增
    insert(coupon) {
        let {type, name, platform, count, amount, perLimit, minPoint, startTime, endTime, useType, note, publishCount, useCount, receiveCount, enableTime, code, memberLevel} = coupon;
        let sql = `insert into sms_coupon(type,name,platform,count,amount,per_limit,min_point,start_time,end_time,use_type,note,publish_count,use_count,receive_count,enable_time,code,member_level)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        return Mysql.excute(sql, [type, name, platform, count, amount, perLimit, minPoint, startTime, endTime, useType, note, publishCount, useCount, receiveCount, enableTime, code, memberLevel]);
    },
    //改
    update(coupon) {
        let {type, name, platform, count, amount, perLimit, minPoint, startTime, endTime, useType, note, publishCount, useCount, receiveCount, enableTime, code, memberLevel} = coupon;
        let set = '';
        if (id) set += `id=${id},`;
        if (type) set += `type=${type},`;
        if (name) set += `name='${name}',`;
        if (platform) set += `platform=${platform},`;
        if (count) set += `count=${count},`;
        if (amount) set += `amount=${amount},`;
        if (perLimit) set += `per_limit=${perLimit},`;
        if (minPoint) set += `min_point=${minPoint},`;
        if (startTime) set += `start_time='${startTime}',`;
        if (endTime) set += `end_time='${endTime}',`;
        if (useType) set += `use_type=${useType},`;
        if (note) set += `note='${note}',`;
        if (publishCount) set += `publish_count=${publishCount},`;
        if (useCount) set += `use_count=${useCount},`;
        if (receiveCount) set += `receive_count=${receiveCount},`;
        if (enableTime) set += `enable_time='${enableTime}',`;
        if (code) set += `code='${code}',`;
        if (memberLevel) set += `member_level=${memberLevel}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update sms_coupon set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //删
    delete(id) {
        let sql = `delete from sms_coupon where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //详情
    coupon(id) {
        let sql = `select ${field} from sms_coupon where id=?`;
        return Mysql.fetch(sql, [id]);
    },
    //列表
    list(name, type, pageNum, pageSize) {
        let where = `where 1=1`;
        if (name) where += ` and name like '%${name}%'`;
        if (type) where += ` and type=${type}`;
        let limit = `limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let sql = `select ${field} from sms_coupon ${where} ${limit}`;
        let count = `select count(*) as count from sms_coupon ${where}`;
        return Mysql.fetch(sql + count);
    },
};