/**
 * Create by xbh 2019-06-05
 */
const Mysql = require('../../util/mysql-util');
let field = `id,flash_promotion_id,flash_promotion_session_id,product_id,flash_promotion_price,flash_promotion_count,flash_promotion_limit,sort`;
module.exports = {
    //增
    insert(productRelation) {
        let {flashPromotionId, flashPromotionSessionId, productId, flashPromotionPrice, flashPromotionCount, flashPromotionLimit, sort} = productRelation;
        let sql = `insert into sms_flash_promotion_product_relation (flash_promotion_id,flash_promotion_session_id,product_id,flash_promotion_price,flash_promotion_count,flash_promotion_limit,sort)values(?,?,?,?,?,?,?)`;
        return Mysql.excute(sql, [flashPromotionId, flashPromotionSessionId, productId, flashPromotionPrice, flashPromotionCount, flashPromotionLimit, sort]);
    },
    //改
    update(productRelation) {
        let {id, flashPromotionId, flashPromotionSessionId, productId, flashPromotionPrice, flashPromotionCount, flashPromotionLimit, sort} = productRelation;
        let set = '';
        if (id) set += `id=${id},`;
        if (flashPromotionId) set += `flash_promotion_id=${flashPromotionId},`;
        if (flashPromotionSessionId) set += `flash_promotion_session_id=${flashPromotionSessionId},`;
        if (productId) set += `product_id=${productId},`;
        if (flashPromotionPrice) set += `flash_promotion_price=${flashPromotionPrice}`;
        if (flashPromotionCount) set += `flash_promotion_count=${flashPromotionCount}`;
        if (flashPromotionLimit) set += `flash_promotion_limit=${flashPromotionLimit}`;
        if (sort) set += `sort=${sort}`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update sms_flash_promotion_product_relation set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //删
    delete(id) {
        let sql = `delete from sms_flash_promotion_product_relation where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //详情
    productRelation(id) {
        let sql = `select ${field} from sms_flash_promotion_product_relation where id=?`;
        return Mysql.fetch(sql, [id]);
    },
    //列表
    list(flashPromotionId, flashPromotionSessionId, pageNum, pageSize) {
        let where = ` where r.flash_promotion_id = ${flashPromotionId}and r.flash_promotion_session_id = ${flashPromotionSessionId}`;
        let order = ` order by r.sort desc`;
        let limit = ` limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let sql = 'select r.id,r.flash_promotion_price,r.flash_promotion_count,' +
            'r.flash_promotion_limit,r.flash_promotion_id,r.flash_promotion_session_id,' +
            'r.product_id,r.sort,p.id p_id,p.name p_name,p.product_sn p_product_sn,' +
            'p.price p_price,p.stock p_stock from sms_flash_promotion_product_relation r ' +
            'left join pms_product p on r.product_id = p.id' + where + order + limit + ';';
        let count = `select count(*) as count from sms_flash_promotion_product_relation r` + where + ';';
        return Mysql.fetch(sql + count);
    },
    //数量
    count(flashPromotionId, flashPromotionSessionId) {
        let where = `where flash_promotion_id=? and flash_promotion_session_id=?`;
        let sql = `select count(*) as count from sms_flash_promotion_product_relation ${where}`;
        return Mysql.fetch(sql, [flashPromotionId, flashPromotionSessionId]);
    },
};