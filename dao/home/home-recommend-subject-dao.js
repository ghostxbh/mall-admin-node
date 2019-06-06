/**
 * Create by xbh 2019-06-05
 */
const Mysql = require('../../util/mysql-util');
let field = `id,subject_id,subject_name,recommend_status,sort`;
module.exports = {
    //增
    insert(recommendSubject) {
        let {subjectId, subjectName, recommendStatus, sort} = recommendSubject;
        let sql = `insert into sms_home_recommend_subject(subject_id,subject_name,recommend_status,sort)values(?,?,?,?)`;
        return Mysql.excute(sql, [subjectId, subjectName, recommendStatus, sort]);
    },
    //改
    update(recommendSubject) {
        let {id, subjectId, subjectName, recommendStatus, sort} = recommendSubject;
        let set = '';
        if (id) set += `id=${id},`;
        if (subjectId) set += `subject_id=${subjectId},`;
        if (subjectName) set += `subject_name=${subjectName},`;
        if (recommendStatus) set += `recommend_status=${recommendStatus},`;
        if (sort) set += `sort=${sort},`;
        if (set.substring(set.length - 1, set.length) === ',') set = set.substring(0, set.length - 1);
        let sql = `update sms_home_recommend_subject set ${set} where id=${id}`;
        return Mysql.transExcute(sql);
    },
    //删
    delete(id) {
        let sql = `delete from sms_home_recommend_subject where id=?`;
        return Mysql.transExcute(sql, [id]);
    },
    //列表
    list(subjectName, recommendStatus, pageNum, pageSize) {
        let where = `where 1=1`;
        if (subjectName) where += ` and subject_name like '%${subjectName}%'`;
        if (recommendStatus) where += ` and recommend_status=${recommendStatus}`;
        let order = `order by sort desc`;
        let limit = `limit ${(pageNum - 1) * pageSize},${pageSize}`;
        let count = `select count(*) as count from sms_home_recommend_subject ${where}`;
        let sql = `select ${field} from sms_home_recommend_subject ${where} ${order} ${limit};`;
        return Mysql.fetch(sql + count);
    },
};