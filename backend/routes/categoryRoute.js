const express = require('express');
const { create, list, read, update, remove } = require('../controller/categoryController');
const { auth, adminCheck } = require('../utils/auth');

const router = express.Router();

router.post('/category', auth, adminCheck, create);
router.get('/categories', list);
router.get('/category/:id', read);
router.put('/category/:id', auth, adminCheck, update);
router.delete('/category/:id', auth, adminCheck, remove);


module.exports = router;