require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const { sequelize } = require('./models/index');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

sequelize
   .sync({ force: false })
   .then(() => {
      console.log('DB 연결');
   })
   .catch(err => {
      console.error(err);
   });

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3001);

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
   error.status = 404;
   next(error);
});

app.listen(app.get('port'), () => {
   console.log(app.get('port'));
});
