/**
 * Create by xbh 2019-05-31 member-level CRUD
 */
const fields = 'id,name,growth_point,default_status,free_freight_point,comment_growth_point,' +
    'priviledge_free_freight,priviledge_sign_in,priviledge_comment,priviledge_promotion,' +
    'priviledge_member_price,priviledge_birthday, note';
const Mysql = require('../util/mysql-util');

module.exports = {
    list(defaultStatus) {
        let sql = `select ${fields} from ums_member_level where default_status=?`;
        return Mysql.fetch(sql, [defaultStatus]);
    }
};