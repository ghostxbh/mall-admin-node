/**
 * Create by xbh 2019-06-08
 */
const Mysql = require('../../util/mysql-util');

module.exports = {
    insertList(list) {
        let value = list.map(x => `(${x.productCategoryId},'${x.productCategoryName}','${x.productCategoryName}',${x.couponId})`).join(',');
        let sql = `insert into sms_coupon_product_category_relation(product_category_id,product_category_name,product_category_name,coupon_id)values(${value})`;
        return Mysql.excute(sql);
    },
    deleteBycouponId(couponId) {
        let sql = `delete from sms_coupon_product_category_relation where coupon_id=?`;
        return Mysql.transExcute(sql, [couponId]);
    },
};