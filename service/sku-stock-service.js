/**
 * Create by xbh 2019-06-09
 */
const skuStockDao = require('../dao/sku-stock-dao');

module.exports = {
    list(pid, keyword) {
        return skuStockDao.list(pid, keyword);
    },
    update(pid,skuStockList){
        return skuStockDao.replaceList(skuStockList);
    },
};