const express = require('express');
const { create, getCount, list, read, update, getFeatured } = require('../controller/productController');
const upload = require('../middleware/upload');
const { auth, adminCheck } = require('../utils/auth');
const router = express.Router();

router.post('/product', upload.single('image'), create);
router.get('/products', list)
router.get('/product/:id', read)
router.put('/product/:id', auth, adminCheck, update)

router.get('/get/count', getCount);
router.get('/get/featured', getFeatured);

module.exports = router;