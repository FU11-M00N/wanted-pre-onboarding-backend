require('dotenv').config();

module.exports = {
   local: {
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      host: '127.0.0.1',
      dialect: process.env.MYSQL_DIALECT,
   },
   development: {
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST,
      dialect: process.env.MYSQL_DIALECT,
   },
   production: {
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST,
      dialect: process.env.MYSQL_DIALECT,
   },
};
