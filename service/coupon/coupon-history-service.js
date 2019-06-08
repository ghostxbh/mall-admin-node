/**
 * Create by xbh 2019-06-08
 */
const historyDao = require('../../dao/coupon/coupon-history-dao');

module.exports = {
    list: async (couponId, useStatus, orderSn, pageNum, pageSize) => {
        let result = {status: true, data: {pageNum, pageSize}};
        let [list, [total]] = await historyDao.list(couponId, useStatus, orderSn, pageNum, pageSize);
        if (list) {
            result.data.list = list;
            result.data.total = total.count;
            result.data.totalPage = Math.ceil(total.count / pageSize);
        } else {
            result.status = false;
            result.data = '查询列表失败';
        }
        return Promise.resolve(result);
    },
};