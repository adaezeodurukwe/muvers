const {
  Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Connection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Chat } = models;
      Connection.hasMany(Chat, {
        foreignKey: "connectionId",
        as: "chats",
        onDelete: "CASCADE"
      });
    }
  }
  Connection.init({
    id: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    admnId: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Connection",
  });
  return Connection;
};
