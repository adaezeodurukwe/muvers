const {
  Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      const { User } = models;
      Ticket.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE"
      });
    }
  }
  Ticket.init({
    userId: DataTypes.INTEGER,
    time: DataTypes.DATE,
    note: DataTypes.STRING,
    plan: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Ticket",
  });
  return Ticket;
};
