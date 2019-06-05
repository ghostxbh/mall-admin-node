/**
 * Create by xbh 2019-05-28 订单自定义查询Dao
 */
const Mysql = require('../util/mysql-util');

const orderDao = {
    //条件查询订单
    list(queryParam) {
        let where = 'where delete_status = 0';
        if (queryParam.orderSn) where += ` and order_sn='${queryParam.orderSn}'`;
        if (queryParam.status) where += ` and status=${queryParam.status}`;
        if (queryParam.sourceType) where += ` and source_type=${queryParam.sourceType}`;
        if (queryParam.orderType) where += ` and order_type = ${queryParam.orderType}`;
        if (queryParam.createTime) where += ` and create_time like concat('${queryParam.createTime}',"%")`;
        if (queryParam.receiverKeyword) where += ` and (receiver_name like concat("%",'${queryParam.receiverKeyword}',"%")or receiver_phone like concat("%",'${queryParam.receiverKeyword}',"%"))`;
        let sql = ` select * from oms_order ${where}`;
        return Mysql.fetch(sql);
    },
    //批量发货
    delivery(list) {
        let deliverySn = '';
        let deliveryCompany = '';
        let deliveryTime = '';
        let status = '';
        for (let i = 0; i < list.length; i++) {
            deliverySn += ` when ${list[i].orderId} then ${list[i].deliverySn}`;
            deliveryCompany += ` when ${list[i].orderId} then ${list[i].deliveryCompany}`;
            deliveryTime += ` when ${list[i].orderId} then now()`;
            status += ` when ${list[i].orderId} then 2`;
        }
        let sql = `update oms_order set delivery_sn = case id ${deliverySn} end,delivery_company = case id ${deliveryCompany} end,delivery_time = case id ${deliveryTime} end,status = case id ${status}end where id in (${list.map(x => `${x.orderId}`).join(',')}) and status = 1`;
        return Mysql.excute(sql);
    },
    //获取订单详情
    detail(id) {
        let sql = `select o.*,oi.id item_id,oi.product_id item_product_id,oi.product_sn item_product_sn,oi.product_pic item_product_pic,oi.product_name item_product_name,oi.product_brand item_product_brand,oi.product_price item_product_price,oi.product_quantity item_product_quantity,oi.product_attr item_product_attr,oi.sp1 item_sp1,oi.sp2 item_sp2,oi.sp3 item_sp3,oh.id history_id,oh.operate_man history_operate_man,oh.create_time history_create_time,oh.order_status history_order_status,oh.note history_note from oms_order o left join oms_order_item oi on o.id = oi.order_id left join oms_order_operate_history oh on o.id = oh.order_id where o.id = ? order by oi.id asc,oh.create_time desc`;
        return Mysql.fetch(sql, [id])
    },
};

module.exports = orderDao;