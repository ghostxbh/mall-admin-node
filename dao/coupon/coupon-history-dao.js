/**
 * Create by xbh 2019-06-08
 */
const Mysql = require('../../util/mysql-util');
const fields = 'id,coupon_id,member_id,coupon_code,member_nickname,' +
    'get_type,create_time,use_status,' +
    'use_time,order_id,order_sn';

module.exports = {
    list(couponId, useStatus, orderSn, pageNum, pageSize) {
        let where = 'where 1=1';
        if (couponId) where += ` and coupon_id=${couponId}`;
        if (useStatus) where += ` and use_status=${useStatus}`;
        if (orderSn) where += ` and order_sn='${orderSn}'`;
        let limit = '';
        if (pageNum && pageSize) limit += `limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let sql = `select ${fields} from sms_coupon_history ${where} ${limit}`;
        let count = `select count(*) as count from sms_coupon_history ${where}`;
        return Mysql.fetch(sql + count);
    },
};