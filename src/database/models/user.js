/* eslint-disable no-unused-vars */
const {
  Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Ticket } = models;
      User.hasMany(Ticket, {
        foreignKey: "userId",
        as: "tickets",
        onDelete: "CASCADE"
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: DataTypes.STRING,
    accountType: DataTypes.ENUM("admin", "client")
  }, {
    sequelize,
    modelName: "User",
  });
  return User;
};
