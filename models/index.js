const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV;
const config = require('../config/config')[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

const basename = path.basename(__filename);
fs.readdirSync(__dirname) // 현재 폴더의 모든 파일을 조회
   .filter(file => {
      return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
   })
   .forEach(file => {
      // models 폴더 내 모델 파일 불러오기
      const model = require(path.join(__dirname, file));

      console.log(file, model.name);
      db[model.name] = model;
      // 모델 초기화
      model.initiate(sequelize);
   });

Object.keys(db).forEach(modelName => {
   // associate 호출
   if (db[modelName].associate) {
      db[modelName].associate(db);
   }
});

module.exports = db;
