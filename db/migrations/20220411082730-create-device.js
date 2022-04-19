'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      uuid: {
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.INTEGER
      },
      longitude: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },


      // Add some colums to this table 
      lan_interfaces: {
        type: Sequelize.JSONB,
        allowNull: true  /// false
      },
      wan_interfaces: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      mac_address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      os_version: {
        type: Sequelize.STRING,
        allowNull: true
      },
      package_version: {
        allowNull: true,
        type: Sequelize.STRING
      },
      // model: {
      //   allowNull: true,
      //   type: Sequelize.STRING
      // },
      //end




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
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('devices');
  }
};