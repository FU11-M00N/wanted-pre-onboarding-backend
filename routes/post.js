const express = require('express');
const router = express.Router();

const { createPost, updatePost, getPosts, getPost, deletePost } = require('../controller/post/post');
const { verifyToken } = require('../middlewares/middlewares');

// 게시글 생성
router.post('/', verifyToken, createPost);
// 게시글 수정
router.patch('/:postId', verifyToken, updatePost);
// 게시글 삭제
router.delete('/:postId', verifyToken, deletePost);

// 게시글 목록 조회
router.get('/', getPosts);
// 특정 게시글 조회
router.get('/:postId', getPost);

module.exports = router;
