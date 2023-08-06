const express = require('express');
const router = express.Router();

const { uploadPost, updatePost, getPosts, getPost } = require('../controller/post/post');
const { verifyToken } = require('../middlewares/middlewares');

router.post('/', verifyToken, uploadPost);
router.patch('/:id', verifyToken, updatePost);

router.get('/', getPosts);
router.get('/:id', getPost);

module.exports = router;
