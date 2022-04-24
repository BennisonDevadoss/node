'use strict';

export async function up(queryInterface, Sequelize) {

  await queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT
    },
    uuid: {
      type: Sequelize.BIGINT,
      allowNull: false,
      unique: true,
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
      allowNull: false,
      type: Sequelize.STRING
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
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('users');
}