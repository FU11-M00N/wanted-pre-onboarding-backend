const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
   static initiate(sequelize) {
      Post.init(
         {
            title: {
               type: Sequelize.STRING(40),
               allowNull: false,
            },
            content: {
               type: Sequelize.STRING(150),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscore: false,
            modelName: 'Post',
            tableName: 'post',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
         },
      );
   }
   static associate(db) {
      db.Post.belongsTo(db.User);
   }
}
module.exports = Post;
