'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      encrypted_password: {
        allowNull: true,
        type: Sequelize.STRING
      },
      otp_counter: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      is_otp_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      last_otp_verified_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      current_sign_in_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      otp_secret_key: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organization_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      access_token: {
        allowNull: true,
        type: Sequelize.STRING
      },
      confirmed_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
}
