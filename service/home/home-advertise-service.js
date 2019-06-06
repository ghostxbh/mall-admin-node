/**
 * Create by xbh 2019-06-05
 */
const advertiseDao = require('../../dao/home/home-advertise-dao');
module.exports = {
    //批量添加
    create(advertise) {
        advertise.clickCount = 0;
        advertise.orderCount = 0;
        return advertiseDao.insert(advertise);
    },
    //修改上下线状态
    updateStatus(id, status) {
        let advertise = {id, status};
        return advertiseDao.update(advertise);
    },
    //删
    delete(ids) {
        ids.map(x => advertiseDao.delete(x));
        return Promise.resolve(ids.length);
    },
    //修改
    update(id, advertise) {
        advertise.id = id;
        return advertiseDao.update(advertise);
    },
    //详情
    advertise(id) {
        return advertiseDao.advertise(id);
    },
    //列表
    list: async (name, type, endTime, pageNum, pageSize) => {
        let result = {pageNum, pageSize};
        let endStart = endTime + ' 00:00:00';
        let endEnd = endTime + ' 23:59:59';
        let [list, [total]] = await advertiseDao.list(name, type, endStart, endEnd, pageNum, pageSize);
        result.list = list || [];
        result.total = total.count || 0;
        result.totalPage = Math.ceil(total.count / pageSize) || 0;
        return Promise.resolve(result);
    },
};