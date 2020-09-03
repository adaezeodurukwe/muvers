module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Users", [{
      firstName: "Adaeze",
      lastName: "Odurukwe",
      email: "daizyodurukwe@gmail.com",
      password: "$2b$08$.4RgxGSKvJ9INHRSnyoCHeMjPJ/XSKb921178Ct3ZwKGvgQEhi1Jq",
      accountType: "admin",
      phone: "08136770975",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
