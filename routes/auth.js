const express = require('express');
const router = express.Router();

const { login, join, test } = require('../controller/auth/auth');
const { verifyToken } = require('../middlewares/middlewares');

router.post('/login', login);
router.post('/join', join);
router.post('/test', verifyToken, test);

module.exports = router;
