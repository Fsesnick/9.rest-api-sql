'use strict';
const Sequelize = require('sequelize');


module.exports = (sequelize) => {
  class Course extends Sequelize.Model  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Course.init({
    title:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: Sequelize.TEXT,
    estimatedTime:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    materialsNeeded:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: Sequelize.INTEGER
  },{sequelize});
  
  Course.associate = (models) => {
    Course.belongsTo(models.User);
  };

  return Course;
};