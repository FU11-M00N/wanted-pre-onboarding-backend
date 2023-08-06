const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config(); // process.env

exports.verifyToken = (req, res, next) => {
   try {
      req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
      return next();
   } catch (error) {
      if (error.name === 'TokenExpiredError') {
         return res.status(401).json({
            code: 401,
            message: '토큰 만료',
         });
      }
      return res.status(401).json({
         code: 401,
         message: '유효하지 않은 토큰',
      });
   }
};
