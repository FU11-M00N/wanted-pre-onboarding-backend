const express = require('express');
const router = express.Router();

const { uploadPost } = require('../controller/post/post');
const { verifyToken } = require('../middlewares/middlewares');

router.post('/', verifyToken, uploadPost);

module.exports = router;
