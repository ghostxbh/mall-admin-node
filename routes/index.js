/**
 * Create by xbh 2019-05-29 集中路由管理
 */
var express = require('express');
var router = express.Router();

router.use('/role', require('./api/role'));
router.use('/permission', require('./api/permission'));
router.use('/memberLevel', require('./api/member-level'));
router.use('/admin', require('./api/admin'));
router.use('/home', require('./api/home/index'));
router.use('/flash', require('./api/flash/flash-promotion'));
router.use('/flashSession', require('./api/flash/flash-promotion-session'));
router.use('/flashProductRelation', require('./api/flash/flash-promotion-product-relation'));
router.use('/couponHistory', require('./api/coupon/coupon-history'));
router.use('/coupon', require('./api/coupon/coupon'));
router.use('/sku', require('./api/sku-stock'));
// router.use('/productAttribute/category', require('./api/product/product-attribute-category'));
// router.use('/productAttribute', require('./api/product/product-attribute'));
// router.use('/productCategory', require('./api/product/product-category'));
// router.use('/product', require('./api/product/product'));
// router.use('/brand', require('./api/brand'));
// router.use('/aliyun/oss', require('./api/oss'));
// router.use('/orderSetting', require('./api/order/order-setting'));
// router.use('/returnReason', require('./api/order/order-return-reason'));
// router.use('/returnApply', require('./api/order/order-return-apply'));
// router.use('/order', require('./api/order/order'));
// router.use('/companyAddress', require('./api/company-address'));
// router.use('/subject', require('./api/subject'));
// router.use('/prefrenceArea', require('./api/prefrence-area'));

module.exports = router;
