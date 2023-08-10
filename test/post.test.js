const { createPost, updatePost, deletePost, getPosts, getPost } = require('../controller/post/post');

const Post = require('../models/post');

describe('post api', () => {
   it('게시글 생성', async () => {
      const req = {
         body: { title: '게시글 제목입니다.', content: '게시글 본문입니다.' },
         decoded: { userId: 1 },
      };
      const res = {
         status: jest.fn(() => res),
         json: jest.fn(),
         send: jest.fn(),
      };
      const post = {
         id: 100,
         title: '게시글 제목입니다.',
         content: '게시글 본문입니다.',
         UserId: req.decoded.userId,
         updatedAt: '2023-08-09T13:16:30.243Z',
         createdAt: '2023-08-09T13:16:30.243Z',
      };
      Post.create = jest.fn().mockReturnValue(post);

      await createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(post);
   });
   it('게시글 수정', async () => {
      const req = {
         body: { title: '게시글 제목입니다 수정', content: '게시글 본문입니다. 수정' },
         decoded: { userId: 1 },
         params: { postId: 100 },
      };
      const res = {
         status: jest.fn(() => res),
         json: jest.fn(),
         send: jest.fn(),
      };
      const post = {
         id: 100,
         title: '게시글 제목입니다 수정',
         content: '게시글 본문입니다. 수정',
         UserId: req.decoded.userId,
         updatedAt: '2023-08-09T13:16:30.243Z',
         createdAt: '2023-08-09T13:16:30.243Z',
      };

      Post.findOne = jest.fn().mockReturnValue(post);

      Post.update = jest.fn().mockReturnValue(post);

      await updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('게시글 수정 완료.');
   });
   it('다른 유저가 게시글을 수정하려고 할 경우', async () => {
      const req = {
         body: { title: '게시글 제목입니다 수정', content: '게시글 본문입니다. 수정' },
         decoded: { userId: 1 },
         params: { postId: 100 },
      };
      const res = {
         status: jest.fn(() => res),
         json: jest.fn(),
         send: jest.fn(),
      };
      const post = {
         id: 100,
         title: '게시글 제목입니다.',
         content: '게시글 본문입니다.',
         UserId: 2,
         updatedAt: '2023-08-09T13:16:30.243Z',
         createdAt: '2023-08-09T13:16:30.243Z',
      };

      Post.findOne = jest.fn().mockReturnValue(post);

      Post.update = jest.fn().mockReturnValue(post);

      await updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith('올바른 요청 방식이 아닙니다.');
   });

   it('수정하려고 하는 게시글이 존재하지 않을 경우', async () => {
      const req = {
         body: { title: '게시글 제목입니다 수정', content: '게시글 본문입니다. 수정' },
         decoded: { userId: 1 },
         params: { postId: 100 },
      };
      const res = {
         status: jest.fn(() => res),
         json: jest.fn(),
         send: jest.fn(),
      };

      Post.findOne = jest.fn().mockReturnValue(null);

      await updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith('올바른 요청 방식이 아닙니다.');
   });

   it('게시글 삭제', async () => {
      const req = {
         decoded: { userId: 1 },
         params: { postId: 100 },
      };
      const res = {
         status: jest.fn(() => res),
         json: jest.fn(),
         send: jest.fn(),
      };
      const post = {
         id: 100,
         title: '게시글 제목입니다.',
         content: '게시글 본문입니다.',
         UserId: req.decoded.userId,
         updatedAt: '2023-08-09T13:16:30.243Z',
         createdAt: '2023-08-09T13:16:30.243Z',
      };

      Post.findOne = jest.fn().mockReturnValue(post);
      Post.destroy = jest.fn();

      await deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('게시글 삭제 완료');
   });

   it('다른 유저가 게시글을 삭제하려고 할 경우', async () => {
      const req = {
         decoded: { userId: 1 },
         params: { postId: 100 },
      };
      const res = {
         status: jest.fn(() => res),
         json: jest.fn(),
         send: jest.fn(),
      };
      const post = {
         id: 100,
         title: '게시글 제목입니다.',
         content: '게시글 본문입니다.',
         UserId: 2,
         updatedAt: '2023-08-09T13:16:30.243Z',
         createdAt: '2023-08-09T13:16:30.243Z',
      };

      Post.findOne = jest.fn().mockReturnValue(post);
      Post.destroy = jest.fn();

      await deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith('올바른 요청 방식이 아닙니다.');
   });

   it('삭제하려고 하는 게시글이 존재하지 않을 경우', async () => {
      const req = {
         decoded: { userId: 1 },
         params: { postId: 100 },
      };
      const res = {
         status: jest.fn(() => res),
         json: jest.fn(),
         send: jest.fn(),
      };

      Post.findOne = jest.fn().mockReturnValue(false);

      await deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith('올바른 요청 방식이 아닙니다.');
   });
});
