/**
 * Create by xbh 2019-06-05
 */
const productRelationDao = require('../../dao/flash/flash-promotion-product-relation-dao');
module.exports = {
    //批量添加
    create(productRelationList) {
        productRelationList.map(x => productRelationDao.insert(x));
        return Promise.resolve(productRelationList.length);
    },
    //修改上下线状态
    updateStatus(id, status) {
        let productRelation = {id, status};
        return productRelationDao.update(productRelation);
    },
    //删
    delete(id) {
        return productRelationDao.delete(id);
    },
    //修改
    update(id, productRelation) {
        productRelation.id = id;
        return productRelationDao.update(productRelation);
    },
    //详情
    productRelation(id) {
        return productRelationDao.productRelation(id);
    },
    //列表
    list(flashPromotionId, flashPromotionSessionId, pageNum, pageSize) {
        return productRelationDao.list(flashPromotionId, flashPromotionSessionId, pageNum, pageSize);
    },
};