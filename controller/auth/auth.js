const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../../models/user');
const { emailCheck, passwordCheck } = require('./validation');

exports.login = async (req, res, next) => {
   try {
      const jwtKey = process.env.JWT_SECRET_KEY;
      const { email, password } = req.body;

      const errors = {};
      // 이메일 유효성 검증
      emailCheck(email, errors);
      // 패스워드 유효성 검증
      passwordCheck(password, errors);

      if (!Object.keys(errors).length) {
         const user = await User.findOne({
            where: { email },
         });
         if (user) {
            const exUser = await bcrypt.compare(password, user.password);
            if (exUser) {
               // 유효한 유저일 시 토큰 발행
               let token = jwt.sign(
                  {
                     type: 'JWT',
                     email,
                     userId: user.id,
                  },
                  jwtKey,
                  {
                     expiresIn: '15m',
                     algorithm: 'HS256',
                  },
               );
               return res.status(200).json({
                  code: 200,
                  message: '로그인 성공',
                  token,
               });
            } else {
               res.status(401).send('존재하지 않는 유저이거나 패스워드가 일치하지 않습니다.');
            }
         } else {
            res.status(401).send('존재하지 않는 유저이거나 패스워드가 일치하지 않습니다.');
         }
      } else {
         res.status(400).send(errors);
      }
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};

exports.join = async (req, res, next) => {
   try {
      const { email, password } = req.body;
      const errors = {};

      // 이메일 유효성 검증
      emailCheck(email, errors);
      // 패스워드 유효성 검증
      passwordCheck(password, errors);

      if (!Object.keys(errors).length) {
         // 이메일 중복 검사
         const user = await User.findOne({
            where: { email },
         });

         if (!user) {
            const hash = await bcrypt.hash(password, 12);
            await User.create({
               email,
               password: hash,
            });
            res.status(201).send('회원가입 성공');
         } else {
            res.status(400).send('중복된 이메일 입니다.');
         }
      } else {
         res.status(400).send(errors);
      }
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
};
