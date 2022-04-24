'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable('organizations', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        description: {
          type: Sequelize.BIGINT,
          allowNull: false
        },
        created_by: {
          type: Sequelize.BIGINT,
          allownull: false,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        updated_by: {
          type: Sequelize.BIGINT,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        deleted_by: {
          type: Sequelize.BIGINT,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        devices_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        provisioned_devices_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
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
      })
      .then(() =>
        queryInterface.addIndex('organizations', [  // ???
          'created_by',
          'updated_by',
          'deleted_by'
        ])
      ),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('organizations')
}; 