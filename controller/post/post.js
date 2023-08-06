const Post = require('../../models/post');
const User = require('../../models/user');

exports.uploadPost = async (req, res, next) => {
   try {
      const { title, content } = req.body;
      await Post.create({
         title,
         content,
         UserId: req.decoded.userId,
      });
      res.status(200).send('포스트 생성 완료');
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};

exports.updatePost = async (req, res, next) => {
   try {
      const post = await Post.findOne({
         where: { id: req.params.id },
      });
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};

exports.getPosts = async (req, res, next) => {
   try {
      const { page } = req.query;
      let { limit } = req.query;
      let offset;

      if (!Number(limit) || limit == undefined) {
         // limit이 문자열 이거나, undefined 일 경우 default value 할당
         limit = 10;
      }

      if (!Number(page) || page === undefined) {
         // page가 문자열 이거나, undefiend 일 경우 default value 할당
         offset = 0;
      } else {
         offset = limit * (Number(page) - 1);
      }

      const posts = await Post.findAndCountAll({
         limit: Number(limit) ? Number(limit) : 10,
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
         where: { id: req.params.id },
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
