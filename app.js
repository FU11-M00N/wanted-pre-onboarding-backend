const express = require('express');

const morgan = require('morgan');
const app = express();

const { sequelize } = require('./models/index');

sequelize
   .sync({ force: false })
   .then(() => {
      console.log('DB 연결');
   })
   .catch(err => {
      console.error(err);
   });

app.use(morgan('dev'));

require('dotenv').config();

app.set('port', process.env.PORT || 3001);

app.get('/', (req, res) => {
   res.send('test');
});

app.listen(app.get('port'), () => {
   console.log(app.get('port'));
});
