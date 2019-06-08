/**
 * Create by xbh 2019-06-08
 */
const Mysql = require('../../util/mysql-util');

module.exports = {
    insertList(list) {
        let value = list.map(x => `(${x.productId},'${x.productName}','${x.productSn}',${x.couponId})`).join(',');
        let sql = `insert into sms_coupon_product_relation(product_id,product_name,product_sn,coupon_id)values(${value})`;
        return Mysql.excute(sql);
    },
    deleteBycouponId(couponId) {
        let sql = `delete from sms_coupon_product_relation where coupon_id=?`;
        return Mysql.transExcute(sql, [couponId]);
    },
};