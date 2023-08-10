const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { login, join } = require('../controller/auth/auth');
const User = require('../models/user');

describe('Login function', () => {
   it('아이디와 패스워드가 일치할 때 로그인 성공', async () => {
      // 모의 객체 생성
      const req = {
         body: {
            email: 'test@example.com',
            password: 'test12345',
         },
      };
      const res = {
         status: jest.fn(() => res),
         json: jest.fn(),
         send: jest.fn(),
      };

      // User.fineOne 모의 함수 설정
      User.findOne = jest.fn().mockReturnValue(req.body);
      // bcrypt.compare 모의 함수 설정
      bcrypt.compare = jest.fn().mockReturnValue(true);
      // jwt.sign 모의 함수 설정
      jwt.sign = jest.fn().mockReturnValue('testToken');

      // 실행
      await login(req, res);

      // 기대 결과 확인
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
         code: 200,
         message: '로그인 성공',
         token: 'testToken',
      });
   });

   it('아이디와 패스워드가 일치하지 않을 때 로그인 실패', async () => {
      // 모의 객체 생성
      const req = {
         body: {
            email: 'test@test.com',
            password: 'test12345',
         },
      };
      const res = {
         status: jest.fn(() => res),
         json: jest.fn(),
         send: jest.fn(),
      };

      // User.fineOne 모의 함수 설정
      User.findOne = jest.fn().mockReturnValue(req.body);
      // bcrypt.compare 모의 함수 설정
      bcrypt.compare = jest.fn().mockReturnValue(false);
      // jwt.sign 모의 함수 설정
      jwt.sign = jest.fn().mockReturnValue('testToken');

      // 실행
      await login(req, res);

      // 기대 결과 확인
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith('존재하지 않는 유저이거나 패스워드가 일치하지 않습니다.');
   });

   it('존재하지 않는 유저 일 경우 로그인 실패', async () => {
      // 모의 객체 생성
      const req = {
         body: {
            email: 'test@test.com',
            password: 'test12345',
         },
      };
      const res = {
         status: jest.fn(() => res),
         json: jest.fn(),
         send: jest.fn(),
      };

      // User.fineOne 모의 함수 설정
      User.findOne = jest.fn().mockReturnValue(null);
      // bcrypt.compare 모의 함수 설정
      bcrypt.compare = jest.fn().mockReturnValue(true);
      // jwt.sign 모의 함수 설정
      jwt.sign = jest.fn().mockReturnValue('testToken');

      // 실행
      await login(req, res);

      // 기대 결과 확인
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith('존재하지 않는 유저이거나 패스워드가 일치하지 않습니다.');
   });
});

describe('Join function', () => {
   it('db 내 회원가입을 시도 한 이메일이 존재하지 않을 시 회원가입 성공', async () => {
      // 모의 객체 생성
      const req = {
         body: {
            email: 'test@example.com',
            password: 'test12345',
         },
      };
      const res = {
         status: jest.fn(() => res),
         json: jest.fn(),
         send: jest.fn(),
      };

      // User.fineOne 모의 함수 설정
      User.findOne = jest.fn().mockReturnValue(false);
      // User.create 모의 함수 설정
      User.create = jest.fn();
      // bcrypt.compare 모의 함수 설정
      bcrypt.hash = jest.fn().mockResolvedValue('mocked_hash');

      // 실행
      await join(req, res);

      // 기대 결과 확인
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith('회원가입 성공');
   });

   it('db 내 회원가입을 시도 한 이메일이 존재할 시 중복된 이메일 리턴', async () => {
      // 모의 객체 생성
      const req = {
         body: {
            email: 'test@example.com',
            password: 'test12345',
         },
      };
      const res = {
         status: jest.fn(() => res),
         json: jest.fn(),
         send: jest.fn(),
      };

      // User.fineOne 모의 함수 설정
      User.findOne = jest.fn().mockReturnValue(true);

      // bcrypt.compare 모의 함수 설정
      bcrypt.hash = jest.fn().mockResolvedValue('mocked_hash');

      // 실행
      await join(req, res);

      // 기대 결과 확인
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('중복된 이메일 입니다.');
   });
});
