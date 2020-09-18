/* eslint-disable no-unused-vars */
const {
  Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chat.init({
    userId: DataTypes.STRING,
    parentId: DataTypes.STRING,
    connectionId: DataTypes.STRING,
    senderName: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Chat",
  });
  return Chat;
};
