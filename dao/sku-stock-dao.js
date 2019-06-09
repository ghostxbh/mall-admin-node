/**
 * Create by xbh 2019-06-09
 */
const Mysql = require('../util/mysql-util');
let field = 'id,product_id,sku_code,price,stock,low_stock,sp1,sp2,sp3,pic,sale,promotion_price,lock_stock';
module.exports = {
    list(pid, keyword) {
        let where = `where 1=1`;
        if (pid) where += ` and product_id=${pid}`;
        if (keyword) where += ` and sku_code like '%${keyword}%'`;
        let sql = `select ${field} from pms_sku_stock ${where}`;
        return Mysql.fetch(sql);
    },
    replaceList(skuStockList) {
        let value = skuStockList.map(x => `(${x.id},${x.productId},${x.skuCode},${x.price},${x.stock},${x.lowStock},${x.sp1},${x.sp2},${x.sp3},${x.pic},${x.sale})`).join(',');
        let sql = `replace into pms_sku_stock (id,product_id, sku_code, price, stock, low_stock, sp1, sp2, sp3, pic, sale) values (${value})`;
        return Mysql.transExcute(sql);
    },
};