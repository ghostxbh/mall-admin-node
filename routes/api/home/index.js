/**
 * Create by xbh 2019-06-05 首页集中路由
 */
var express = require('express');
var router = express.Router();

router.use('/advertise', require('./home-advertise'));
router.use('/recommendSubject', require('./home-recommend-subject'));
router.use('/recommendProduct', require('./home-recommend-product'));
router.use('/newProduct', require('./home-new-product'));
router.use('/brand', require('./home-brand'));

module.exports = router;