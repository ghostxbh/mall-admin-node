/**
 * Create by xbh 2019-06-05
 */
const newProductDao = require('../../dao/home/home-new-product-dao');
module.exports = {
    //批量添加
    create(newList) {
        newList.map(x => {
            x.recommendStatus = 1;
            x.sort = 0;
            newProductDao.insert(x);
        });
        return Promise.resolve(newList.length);
    },
    //批量修改排序
    updateSort(id, sort) {
        let recommendSubject = {id, sort};
        return newProductDao.update(recommendSubject);
    },
    //删
    delete(ids) {
        ids.map(x => newProductDao.delete(x));
        return Promise.resolve(ids.length);
    },
    //批量修改状态
    updateRecommendStatus(ids, recommendStatus) {
        let recommendSubject = {recommendStatus};
        ids.map(x => {
            let subject = {...recommendSubject};
            subject.id = x;
            newProductDao.update(subject);
        });
        return Promise.resolve(ids.length);
    },
    //列表
    list: async (subjectName, recommendStatus, pageNum, pageSize) => {
        let result = {pageNum, pageSize};
        let [list, [total]] = await newProductDao.list(subjectName, recommendStatus, pageNum, pageSize);
        result.list = list || [];
        result.total = total.count || 0;
        result.totalPage = Math.ceil(total.count / pageSize) || 0;
        return Promise.resolve(result);
    },
};