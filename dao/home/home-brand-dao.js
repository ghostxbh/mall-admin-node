/**
 * Create by xbh 2019-06-05
 */
const Mysql = require('../../util/mysql-util');
let field = `id,brand_id,brand_name,recommend_status,sort`;
module.exports = {
    //增
    insert(recommendProduct) {
        let {brandId, brandName, recommendStatus, sort} = recommendProduct;
        let sql = `insert into sms_home_brand(brand_id,brand_name,recommend_status,sort)values(?,?,?,?)`;
        return Mysql.excute(sql, [brandId, brandName, recommendStatus, sort]);
    },
    //改
    update(recommendSubject) {
        let {id, brandId, brandName, recommendStatus, sort} = recommendSubject;
        let set = '';
        if (id) set += `id=${id},`;
        if (brandId) set += `brand_id=${brandId},`;
        if (brandName) set += `brand_name=${brandName},`;
        if (recommendStatus) set += `recommend_status=${recommendStatus},`;
        if (sort) set += `sort=${sort},`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update sms_home_brand set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //删
    delete(id) {
        let sql = `delete from sms_home_brand where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //列表
    list(brandName, recommendStatus, pageNum, pageSize) {
        let where = `where 1=1`;
        if (brandName) where += ` and brand_name like '%${brandName}%'`;
        if (recommendStatus) where += ` and recommend_status=${recommendStatus}`;
        let order = `order by sort desc`;
        let limit = `limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let count = `select count(*) as count from sms_home_brand ${where}`;
        let sql = `select ${field} from sms_home_brand ${where} ${order} ${limit};`;
        return Mysql.fetch(sql + count);
    },
};