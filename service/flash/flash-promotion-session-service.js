/**
 * Create by xbh 2019-06-05
 */
const promotionSessionDao = require('../../dao/flash/flash-promotion-session-dao');
const relationDao = require('../../dao/flash/flash-promotion-product-relation-dao');
module.exports = {
    //批量添加
    create(promotionSession) {
        promotionSession.createTime = new Date();
        return promotionSessionDao.insert(promotionSession);
    },
    //修改上下线状态
    updateStatus(id, status) {
        let promotionSession = {id, status};
        return promotionSessionDao.update(promotionSession);
    },
    //删
    delete(id) {
        return promotionSessionDao.delete(id);
    },
    //修改
    update(id, promotionSession) {
        promotionSession.id = id;
        return promotionSessionDao.update(promotionSession);
    },
    //详情
    promotionSession(id) {
        return promotionSessionDao.promotionSession(id);
    },
    //列表
    list() {
        return promotionSessionDao.list();
    },
    //可选场次
    selectList: async (flashPromotionId) => {
        let statusList = await promotionSessionDao.listByStatus(1);
        let data = [];
        for (let i = 0; i < statusList.length; i++) {
            let session = {...statusList[i]};
            let [tatol] = await relationDao.count(flashPromotionId, session.id);
            session.productCount = tatol.count;
            data.push(session);
        }
        return Promise.resolve(data);
    },
};