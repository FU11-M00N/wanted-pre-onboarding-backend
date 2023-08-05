require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const { sequelize } = require('./models/index');

const authRouter = require('./routes/auth');

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

app.get('/', (req, res) => {
   res.send('test');
});

app.listen(app.get('port'), () => {
   console.log(app.get('port'));
});
