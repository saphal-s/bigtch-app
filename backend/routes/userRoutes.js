const express = require('express');
const { list, read, login, register, regiserValidations, loginValidations } = require('../controller/userController');
const { auth, adminCheck } = require('../utils/auth');
const router = express.Router();

router.post('/register', regiserValidations, register);
router.get('/users', auth, adminCheck, list);
router.get('/user/:id', auth, read);
router.post('/login', loginValidations, login);


module.exports = router;