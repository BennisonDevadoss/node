"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
function Device(sequelize) {
    return sequelize.define('Device', {
        name: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING
        },
        UUID: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER
        },
        organization_id: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING
        },
        device_type: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING
        },
        latitude: {
            allowNull: true,
            type: sequelize_1.DataTypes.INTEGER
        },
        longitude: {
            allowNull: true,
            type: sequelize_1.DataTypes.INTEGER
        },
        description: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING
        }
    }, {
        tableName: 'devices',
        paranoid: true
    });
}
exports.default = Device;
