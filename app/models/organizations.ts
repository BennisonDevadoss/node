import { DataTypes, Model, Sequelize, ModelDefined } from 'sequelize';
import { isNameUnique } from './validations'

import {
    OrganizationAttributes,
    OrganizationCreationAttributes
} from '../types/organization'
import { UserInstance } from './users';

export interface OrganizationInstance
    extends Model<OrganizationAttributes, OrganizationCreationAttributes>,
    OrganizationAttributes {
    // devices?: DeviceInstance[];
    users?: UserInstance[];
}

type OrganizationModelDefined = ModelDefined<
    OrganizationAttributes,
    OrganizationCreationAttributes
>;

function Organization(sequelize: Sequelize): OrganizationModelDefined {
    return sequelize.define(
        'organizations',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isNameUnique,
                    len: {
                        args: [3, 100],
                        msg: 'Name should be greater than 3 and less than or equal to 100'
                    },
                    notNull: {
                        msg: 'Only alphanumeric, space, hypen and underscore are allowed'
                    },
                    is: {
                        args: [/^[a-zA-Z0-9 _-]*$/],
                        msg: 'Only alphanumeric, space, hypen and underscore are allowed'
                    }
                }
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            devices_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    len: {
                        args: [3, 100],
                        msg:
                            'Client name should be greater than 3 and less than or equal to 100'
                    },
                    is: {
                        args: [/^[a-zA-Z0-9 _-]*$/],
                        msg:
                            'Only alphanumeric, space, hypen and underscore are allowed in the client name',
                    }
                }
            },
            provisioned_devices_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    notNull: {
                        msg: 'Provisioned devices count should be present'
                    }
                }
            },
            client_email: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    len: {
                        args: [0, 255],
                        msg: 'Client email length should be less than or equal to 255'
                    },
                    isEmail: {
                        msg: 'Client email should be valid format'
                    }
                }
            },
            client_mobile_no: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    len: {
                        args: [0, 255],
                        msg: 'Client email length should be less than or equel to 15'
                    }
                }
            },
            client_name: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    len: {
                        args: [3, 100],
                        msg: 'Client name should be greater than 3 and less than or equel to 100',
                    },
                    is: {
                        args: [/^[a-zA-Z0-9 _-]*$/],
                        msg:
                            'Only alphanumeric, space, hypen and underscore are allowed in the client name'
                    }
                }
            },
            client_address: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            created_by: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                validate: {
                    notNull: {
                        msg: 'Created by should be present'
                    }
                }
            },
            updated_by: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            deleted_by: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        },
        {
            tableName: 'organizations',
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
            indexes: [{ fields: ['created_by', 'updated_by', 'deleted_by'] }]
        }
    ) as OrganizationModelDefined
}
export default Organization;
