/**
 * Create by xbh 2019-06-05
 */
const Mysql = require('../../util/mysql-util');
let field = `id,product_id,product_name,recommend_status,sort`;
module.exports = {
    //增
    insert(recommendProduct) {
        let {productId, productName, recommendStatus, sort} = recommendProduct;
        let sql = `insert into sms_home_recommend_product(product_id,product_name,recommend_status,sort)values(?,?,?,?)`;
        return Mysql.excute(sql, [productId, productName, recommendStatus, sort]);
    },
    //改
    update(recommendSubject) {
        let {id, productId, productName, recommendStatus, sort} = recommendSubject;
        let set = '';
        if (id) set += `id=${id},`;
        if (productId) set += `product_id=${productId},`;
        if (productName) set += `product_name=${productName},`;
        if (recommendStatus) set += `recommend_status=${recommendStatus},`;
        if (sort) set += `sort=${sort},`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update sms_home_recommend_product set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //删
    delete(id) {
        let sql = `delete from sms_home_recommend_product where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //列表
    list(productName, recommendStatus, pageNum, pageSize) {
        let where = `where 1=1`;
        if (productName) where += ` and product_name like '%${productName}%'`;
        if (recommendStatus) where += ` and recommend_status=${recommendStatus}`;
        let order = `order by sort desc`;
        let limit = `limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let count = `select count(*) as count from sms_home_recommend_product ${where}`;
        let sql = `select ${field} from sms_home_recommend_product ${where} ${order} ${limit};`;
        return Mysql.fetch(sql + count);
    },
};