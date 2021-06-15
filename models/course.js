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
  Course.init(
    {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "A course title is required",
        },
        notEmpty: {
          msg: "Please enter a course title",
        },
      },
    },
    description: Sequelize.TEXT,
    estimatedTime:{
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
         notEmpty: {
          msg: "Please enter a course description",
        },
      },
    },    
    estimatedTime: {
      type: Sequelize.STRING,
    },
    materialsNeeded:{
      type: Sequelize.STRING,
      allowNull: true,
    },
    id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },{sequelize});

  Course.associate = (models) => {
    Course.belongsTo(models.User,  {
      as:"User",
      foreignKey:{ 
        fieldName:'userId', 
        //allowNull: false,
       },
     });
  };

  return Course;
};