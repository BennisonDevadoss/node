"use strict";

import { Model, ModelDefined, Sequelize } from "sequelize/types";
import { DataTypes } from 'sequelize'
import { isPasswordValidation, isRoleValidation, isOrgIdValidation } from './validations/user.validation';
import { isEmailUnique } from './validations'
import { USER_ROLE, UserAttributes, UserCreationAttributes } from "../types/user";
export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
    // organization?:
    isSuperAdmin(): boolean
    isCustomerAdmin(): boolean
}
type UserModelDefined = ModelDefined<UserAttributes, UserAttributes>;
function User(sequelize: Sequelize) {
    const UserModel = sequelize.define('User', {
        uuid: {
            allowNull: false,
            type: DataTypes.STRING
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [3, 100],
                    msg: 'Name should be greater than 3 and less than or equal to 100'
                },
                notNull: {
                    msg: 'Name should be present'
                },
                is: {
                    args: [/^[a-zA-Z0-9 _-]*$/],
                    msg: 'Only alphanumeric, space, hypen, and underscore are allowed'
                }
            }
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isEmailUnique,
                len: {
                    args: [0, 255],
                    msg: 'Email length should be less than or equal to 255'
                },
                notNull: {
                    msg: 'Email should be present'
                },
                isEmail: {
                    msg: 'Email shold be valid format'
                }
            }
        },
        encrypted_password: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isLengthValid(value: string) {
                    isPasswordValidation(value);
                }
            }
        },
        role: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isRoleValidation,
                notNull: {
                    msg: 'Role should be present'
                }
            },
        },
        organization_id: {
            allowNull: false,
            type: DataTypes.STRING, // now added 
            references: {
                model: 'organizations',
                key: 'id'
            },
            validate: {
                isOrgIdValidation
            }
        },
        access_token: {
            allowNull: false,
            type: DataTypes.STRING
        }
    },
        {
            tableName: 'users',
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
        })
    UserModel.prototype.isSuperAdmin = function (): boolean {
        return this.role === USER_ROLE.SUPER_ADMIN    // ??
    }
    UserModel.prototype.isCustomerAdmin = function (): boolean {
        return this.role === USER_ROLE.CUSTOMER_ADMIN  // ??
    }
    return UserModel
};

export default User; 
