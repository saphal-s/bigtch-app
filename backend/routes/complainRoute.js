const express = require('express');
const { create, list, update } = require('../controller/complainController');
const upload = require('../middleware/upload');
const { auth, adminCheck } = require('../utils/auth');
const router = express.Router();

router.post('/complain', upload.single('image'), create);
router.get('/complains', list);
router.post('/complain/:id', update);


module.exports = router;