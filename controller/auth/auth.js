const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../../models/user');

const { emailCheck, passwordCheck } = require('./validation');

exports.login = async (req, res, next) => {
   res.status(200).send('success');
};

exports.join = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      const errors = {};
      emailCheck(email, errors);
      passwordCheck(password, errors);

      if (!Object.keys(errors).length) {
         const user = await User.findOne({
            where: { email },
         });
         if (!user) {
            const hash = await bcrypt.hash(password, 12);
            await User.create({
               email,
               password: hash,
            });
            res.status(200).send('회원가입 성공');
         } else {
            res.status(401).send('중복된 이메일 입니다.');
         }
      } else {
         res.status(401).send(errors);
      }
   } catch (error) {
      console.error(error);
      next();
   }
};
