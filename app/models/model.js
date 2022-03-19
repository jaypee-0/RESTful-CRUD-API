module.exports = (sequelize, Sequelize) => {
    const Notes = sequelize.define("notes", {
      name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      createDate: {
        type: Sequelize.DATE
      }
    });
    return Notes;
  };