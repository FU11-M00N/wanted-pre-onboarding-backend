const Sequelize = require('sequelize');

class User extends Sequelize.Model {
   static initiate(sequelize) {
      User.init(
         {
            email: {
               type: Sequelize.STRING(40),
               allowNull: true,
               unique: true,
            },
            password: {
               type: Sequelize.STRING(100),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscore: false,
            modelName: 'User',
            tableName: 'user',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
         },
      );
   }
}
module.exports = User;
