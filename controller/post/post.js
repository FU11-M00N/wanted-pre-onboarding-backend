const Post = require('../../models/post');
const User = require('../../models/user');
const { titleCheck, contentCheck } = require('./validation');

exports.createPost = async (req, res, next) => {
   try {
      const { title, content } = req.body;
      const errors = {};

      // 게시글 제목 길이 체크
      titleCheck(title, errors);
      // 게시글 본문 길이 체크
      contentCheck(content, errors);

      if (Object.keys(errors).length) {
         res.status(400).send(errors);
      } else {
         const post = await Post.create({
            title,
            content,
            UserId: req.decoded.userId,
         });
         res.status(201).send(post);
      }
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};

exports.updatePost = async (req, res, next) => {
   try {
      const { title, content } = req.body;
      const errors = {};

      const post = await Post.findOne({
         where: { id: req.params.postId },
      });

      // 게시글 제목 길이 체크
      titleCheck(title, errors);
      // 게시글 본문 길이 체크
      contentCheck(content, errors);

      if (Object.keys(errors).length) {
         res.status(400).send(errors);
      } else {
         if (post && post.UserId === req.decoded.userId) {
            await Post.update(
               {
                  title: title,
                  content: content,
               },
               {
                  where: { id: req.params.postId },
               },
            );
            res.status(200).send('게시글 수정 완료.');
         } else {
            res.status(403).send('올바른 요청 방식이 아닙니다.');
         }
      }
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};

exports.deletePost = async (req, res, next) => {
   try {
      const post = await Post.findOne({
         where: { id: req.params.postId },
      });

      if (post && post.UserId === req.decoded.userId) {
         // soft delete
         await Post.destroy({
            where: {
               id: req.params.postId,
            },
         });
         res.status(200).send('게시글 삭제 완료');
      } else {
         res.status(403).send('올바른 요청 방식이 아닙니다.');
      }
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};

exports.getPosts = async (req, res, next) => {
   try {
      const { page } = req.query;
      let { limit } = req.query;

      const numPage = Number(page);
      const numLimit = Number(limit);

      let offset;

      if (!numPage || page === undefined) {
         // page가 문자열 이거나, undefiend 일 경우 default value 할당
         offset = 0;
      } else {
         offset = limit * (numPage - 1);
      }

      const posts = await Post.findAndCountAll({
         include: [
            {
               model: User,
               require: true,
               attributes: ['id', 'email'],
            },
         ],
         limit: numLimit ? numLimit : 10,
         offset,
         order: [['createdAt', 'ASC']],
         attributes: ['id', 'title', 'content', 'createdAt'],
      });

      if (posts.rows.length === 0) {
         res.status(200).send('요청 한 범위 내 게시글이 존재하지 않습니다.');
      } else {
         res.status(200).send(posts);
      }
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};

exports.getPost = async (req, res, next) => {
   try {
      const post = await Post.findOne({
         include: [
            {
               model: User,
               require: true,
               attributes: ['id', 'email'],
            },
         ],
         attributes: ['id', 'title', 'content', 'createdAt'],
         where: { id: req.params.postId },
      });
      if (post) {
         res.status(200).send(post);
      } else {
         res.status(404).send('존재하지 않는 게시글입니다.');
      }
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};
