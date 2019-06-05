/**
 * Create by xbh 2019-05-31 member-level 业务
 */
const mlDao = require('../dao/member-level-dao');
module.exports = {
    list(defaultStatus) {
        return mlDao.list(defaultStatus);
    },
};