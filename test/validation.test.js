const { emailCheck, passwordCheck } = require('../controller/auth/validation');
const { titleCheck, contentCheck } = require('../controller/post/validation');

describe('email validation', () => {
   it('이메일 형식이 올바를 때', async () => {
      const email = 'test@test.com';
      const errors = {};

      emailCheck(email, errors);
      expect(Object.keys(errors).length).toEqual(0);
   });
   it('이메일 형식이 올바르지 않을 때', async () => {
      const email = 'testtest.com';
      const errors = {};

      emailCheck(email, errors);
      expect(Object.keys(errors).length).toEqual(1);
   });
});

describe('password validation', () => {
   it('패스워드 형식이 올바를 때', async () => {
      const password = '12345678';
      const errors = {};

      passwordCheck(password, errors);
      expect(Object.keys(errors).length).toEqual(0);
   });
   it('패스워드 형식이 올바르지 않을 때', async () => {
      const password = '1234';
      const errors = {};

      passwordCheck(password, errors);
      expect(Object.keys(errors).length).toEqual(1);
   });
});

describe('title validation', () => {
   it('게시글 제목 길이가 형식에 맞을 때', async () => {
      const title = '게시글 제목 입니다.';
      const errors = {};

      titleCheck(title, errors);
      expect(Object.keys(errors).length).toEqual(0);
   });
   it('게시글 제목 길이가 형식에 맞지 않을 때', async () => {
      const data = '게시글 제목이 40글자 이상입니다.';
      const title = data.repeat(4);
      const errors = {};

      titleCheck(title, errors);
      expect(Object.keys(errors).length).toEqual(1);
   });
});

describe('content validation', () => {
   it('게시글 본문 길이가 형식에 맞을 때', async () => {
      const content = '게시글 본문 입니다.';
      const errors = {};

      contentCheck(content, errors);
      expect(Object.keys(errors).length).toEqual(0);
   });
   it('게시글 본문 길이가 형식에 맞지 않을 때', async () => {
      const data = '게시글 본문이 150글자 이상입니다.';
      const content = data.repeat(8);
      const errors = {};

      contentCheck(content, errors);
      expect(Object.keys(errors).length).toEqual(1);
   });
});
