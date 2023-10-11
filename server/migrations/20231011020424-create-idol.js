'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // creates the table
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Idols', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stageName: {
        type: Sequelize.STRING
      },
      groupName: {
        type: Sequelize.STRING
      },
      legalName: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.STRING
      },
      mbti: {
        type: Sequelize.STRING
      },
      repEmoji: {
        type: Sequelize.STRING
      },
      portrait: {
        type: Sequelize.TEXT
      },
      groupPicture: {
        type: Sequelize.TEXT
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

  // deletes the table
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Idols');
  }
};