"use strict";

import { UserAttributes, UserCreationAttributes } from "../../app/types/user";
import { Model } from "sequelize/types";

export interface UserInterface extends Model<UserAttributes, UserCreationAttributes>,

    function User(sequelize, DataTypes) {
        return sequelize.define('User', {
            uuid: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING
            },
            encrypted_password: {
                allowNull: false,
                type: DataTypes.STRING
            },
            role: {
                allowNull: false,
                type: DataTypes.STRING
            },
            organization_id: {
                allowNull: false,
                type: DataTypes.STRING  // now added 
            },
            access_token: {
                allowNull: false,
                type: DataTypes.STRING
            }
        },
            {
                tablename: 'users',
                underscored: true,
                createAt: 'created_at',
                updatedAt: 'updated_at',
                deletedAt: 'deleted_at',
                paranoid: true,
            })
    }; 