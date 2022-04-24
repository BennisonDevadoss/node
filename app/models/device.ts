'use strict';
import { DataTypes, Model, ModelDefined, Sequelize } from 'sequelize';
import { DeviceAttributes, DeviceCreateAttributes } from '../types';
import { isUUIDUnique } from './validations';
import { isTypeValidation } from './validations/device.validation'
export interface deviceInstance
  extends Model<DeviceAttributes, DeviceCreateAttributes>,
  DeviceAttributes { }
type DeviceModelDefined = ModelDefined<DeviceAttributes, DeviceCreateAttributes>;

function Device(sequelize: Sequelize): DeviceModelDefined {
  return sequelize.define(
    'Device',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 100],
            msg: 'Name should be greater than 3 and less than equal to 100',
          },
          notNull: {
            msg: 'Name should be present'
          },
          is: {
            args: [/^[a-zA-Z0-9 _-]*$/],
            msg: 'Only alphanumeric, space, hypen and underscore are allowed'
          }
        }
      },
      uuid: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          isUUIDUnique,
          notNull: {
            msg: 'UUID should be present'
          },
          len: {
            args: [0, 50],
            msg: 'UUID should be less than or equal to 50'
          },
          notEmpty: {
            msg: 'UUID should be present'
          },
          is: {
            args: [/^[a-fA-F0-9:-]*$/],
            msg: 'Only hexadecimal, colon and hypen are allowed'
          }
        }
      },
      organization_id: {
        allowNull: false,
        type: DataTypes.STRING
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
        // values: ['Virtual CPE', ' Raspberry_Pi', 'G1']
        validate: {
          isTypeValidation,
          notNull: {
            msg: 'Device type should be present'
          }
        }
      },
      latitude: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      longitude: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      lan_interfaces: {
        allowNull: true,
        type: DataTypes.JSONB
      },
      wan_interfaces: {
        allowNull: true,
        type: DataTypes.JSONB
      },
      mac_address: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
      os_version: {
        allowNull: true,
        type: DataTypes.JSONB
      },
      package_version: {
        allowNull: true,
        type: DataTypes.JSONB
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING
      },
    },
    {
      tableName: 'devices',
      paranoid: true,
      underscored: true,
      deletedAt: 'deleted_at',
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    }
  ) as DeviceModelDefined;
}
export default Device;
