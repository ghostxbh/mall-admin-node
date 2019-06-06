/**
 * Create by xbh 2019-06-05
 */
const brandDao = require('../../dao/home/home-brand-dao');
module.exports = {
    //批量添加
    create(brandList) {
        brandList.map(x => {
            x.recommendStatus = 1;
            x.sort = 0;
            brandDao.insert(x);
        });
        return Promise.resolve(brandList.length);
    },
    //批量修改排序
    updateSort(id, sort) {
        let recommendSubject = {id, sort};
        return brandDao.update(recommendSubject);
    },
    //删
    delete(ids) {
        ids.map(x => brandDao.delete(x));
        return Promise.resolve(ids.length);
    },
    //批量修改状态
    updateRecommendStatus(ids, recommendStatus) {
        let recommendSubject = {recommendStatus};
        ids.map(x => {
            let subject = {...recommendSubject};
            subject.id = x;
            brandDao.update(subject);
        });
        return Promise.resolve(ids.length);
    },
    //列表
    list: async (subjectName, recommendStatus, pageNum, pageSize) => {
        let result = {pageNum, pageSize};
        let [list, [total]] = await brandDao.list(subjectName, recommendStatus, pageNum, pageSize);
        result.list = list || [];
        result.total = total.count || 0;
        result.totalPage = Math.ceil(total.count / pageSize) || 0;
        return Promise.resolve(result);
    },
};