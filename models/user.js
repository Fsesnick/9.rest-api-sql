'use strict';
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

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
  User.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A first name must be provided",
          },
          notEmpty: {
            msg: "Please enter your first name",
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A last name must be provided",
          },
        },
      },
      emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          msg: "Email address already in use",
        },
        validate: {
          notNull: {
            msg: "An email address is required",
          },
        },
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A password is required",
          },
          notEmpty: {
            msg: "Please provide a password",
          },
        },
        set(val) {
          if (val) {
            const hashedPassword = bcrypt.hashSync(val, 10);
            this.setDataValue("password", hashedPassword);
          }
        },
      },
    },
    { sequelize });
  /**The associate() method is called in
   *  the db/index.js file after each model 
   * is imported into the Sequelize instance. 
   * This allows code within the associate() method 
   * to access any of the available models. */
  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: "User",
      foreignKey: {
        fieldName: "userId",
        allowNull: false,
      },
    });
  };
  return User;
};




