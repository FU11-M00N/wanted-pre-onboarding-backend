const express = require('express');
const router = express.Router();

const { login, join } = require('../controller/auth/auth');

router.post('/login', login);
router.post('/join', join);

module.exports = router;
