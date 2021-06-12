'use strict';
const Sequelize = require('sequelize');


module.exports = (sequelize) => {
  class User extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  }, {sequelize});
  /**The associate() method is called in
   *  the db/index.js file after each model 
   * is imported into the Sequelize instance. 
   * This allows code within the associate() method 
   * to access any of the available models. */
  User.associate = (models) => {
    User.hasMany(models.Course,  {
       foreignKey:{ 
         fildName:'userId', 
         allowNull: false,
        },
      });
  };

  return User;
};