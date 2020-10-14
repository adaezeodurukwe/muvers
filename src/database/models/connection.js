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
      const { Chat, User } = models;
      Connection.hasMany(Chat, {
        foreignKey: "connectionId",
        as: "chat",
        onDelete: "CASCADE"
      });
      Connection.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Connection.init({
    userId: DataTypes.INTEGER,
    adminId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Connection",
  });
  return Connection;
};
