const { emailCheck, passwordCheck } = require('../controller/auth/validation');

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
