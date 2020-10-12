module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.DATE
      },
      note: {
        type: Sequelize.STRING
      },
      plan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "open",
        values: [
          "open",
          "closed",
          "complete"
        ],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Tickets");
  }
};
