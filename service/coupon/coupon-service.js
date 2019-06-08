/**
 * Create by xbh 2019-06-05
 */
const couponDao = require('../../dao/coupon/coupon-dao');
const relationDao = require('../../dao/coupon/coupon-product-relation-dao');
const categoryRelationDao = require('../../dao/coupon/coupon-product-category-relation-dao');

const couponService = {
    //批量添加
    create: async (couponParam) => {
        couponParam.count = couponParam.publishCount;
        couponParam.useCount = 0;
        couponParam.receiveCount = 0;
        //插入优惠券表
        let {affectedRows} = await couponDao.insert(couponParam);
        //插入优惠券和商品关系表
        if (couponParam.useType === 2) {
            for (let relation in couponParam.productRelationList) {
                relation.couponId = couponParam.id;
            }
            relationDao.insertList(couponParam.productRelationList);
        }
        //插入优惠券和商品分类关系表
        if (couponParam.useType === 1) {
            for (let categoryRelation in couponParam.productCategoryRelationList) {
                categoryRelation.couponId = couponParam.id;
            }
            categoryRelationDao.insertList(couponParam.productCategoryRelationList);
        }
        return Promise.resolve(affectedRows);
    },
    //删
    delete: async (id) => {
        let {affectedRows} = await couponDao.delete(id);
        //删除商品关联
        couponService.deleteProductRelation(id);
        //删除商品分类关联
        couponService.deleteCategoryRelation(id);
        return Promise.resolve(affectedRows);
    },
    //删除商品分类优惠
    deleteCategoryRelation(id) {
        return categoryRelationDao.deleteBycouponId(id);
    },
    //删除商品优惠
    deleteProductRelation(id) {
        return relationDao.deleteBycouponId(id);
    },
    //修改
    update: async (id, couponParam) => {
        coupon.id = id;
        let {affectedRows} = await couponDao.update(coupon);
        //插入优惠券和商品关系表
        if (couponParam.useType === 2) {
            for (let relation in couponParam.productRelationList) {
                relation.couponId = couponParam.id;
            }
            couponService.deleteProductRelation(couponParam.id);
            relationDao.insertList(couponParam.productRelationList);
        }
        //插入优惠券和商品分类关系表
        if (couponParam.useType === 1) {
            for (let categoryRelation in couponParam.productCategoryRelationList) {
                categoryRelation.couponId = couponParam.id;
            }
            couponService.deleteCategoryRelation(couponParam.id);
            categoryRelationDao.insertList(couponParam.productCategoryRelationList);
        }
        return Promise.resolve(affectedRows);
    },
    //详情
    coupon(id) {
        return couponDao.coupon(id);
    },
    //列表
    list: async (name, type, pageNum, pageSize) => {
        let result = {status: true, data: {pageNum, pageSize}};
        let [list, [total]] = await couponDao.list(name, type, pageNum, pageSize);
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

module.exports = couponService;