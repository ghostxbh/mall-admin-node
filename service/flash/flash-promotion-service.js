/**
 * Create by xbh 2019-06-05
 */
const promotionDao = require('../../dao/flash/flash-promotion-dao');
module.exports = {
    //添加
    create(promotion) {
        promotion.createTime = new Date();
        return promotionDao.insert(promotion);
    },
    //修改上下线状态
    updateStatus(id, status) {
        let promotion = {id, status};
        return promotionDao.update(promotion);
    },
    //删
    delete(id) {
        return promotionDao.delete(id);
    },
    //修改
    update(id, promotion) {
        promotion.id = id;
        return promotionDao.update(promotion);
    },
    //详情
    promotion(id) {
        return promotionDao.promotion(id);
    },
    //列表
    list(keyword, pageNum, pageSize) {
        return promotionDao.list(keyword, pageNum, pageSize);
    },
};