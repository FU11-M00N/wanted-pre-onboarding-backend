const Post = require('../../models/post');

exports.uploadPost = async (req, res, next) => {
   const { title, content } = req.body;

   try {
      await Post.create({
         title,
         content,
         UserId: req.decoded.userId,
      });
      res.status(200).send('포스트 생성 완료');
   } catch (error) {
      console.error(error);
   }
};

exports.getPosts = async (req, res, next) => {};
