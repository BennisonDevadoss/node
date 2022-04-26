"use strict";

import { Model, ModelDefined, Sequelize } from "sequelize/types";
import { DataTypes } from "sequelize";
import {
  isPasswordValidation,
  isRoleValidation,
  isOrgIdValidation,
} from "./validations/user.validation";
import { isEmailUnique } from "./validations";
import {
  USER_ROLE,
  UserAttributes,
  UserCreationAttributes,
} from "../types/user";
import { OrganizationInstance } from "./organizations";
export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  organization?: OrganizationInstance;
  isSuperAdmin(): boolean;
  // isCustomerAdmin(): boolean;
  isAdmin(): boolean;
  isUser(): boolean;
}

type UserModelDefined = ModelDefined<UserAttributes, UserAttributes>;
function User(sequelize: Sequelize): UserModelDefined {
  const UserModel = sequelize.define(
    "User",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 100],
            msg: "Name should be greater than 3 and less than or equal to 100",
          },
          notNull: {
            msg: "Name should be present",
          },
          is: {
            args: [/^[a-zA-Z0-9 _-]*$/],
            msg: "Only alphanumeric, space, hypen, and underscore are allowed",
          },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmailUnique,
          len: {
            args: [0, 255],
            msg: "Email length should be less than or equal to 255",
          },
          notNull: {
            msg: "Email should be present",
          },
          isEmail: {
            msg: "Email shold be valid format",
          },
        },
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isRoleValidation,
          notNull: {
            msg: "Role should be present",
          },
        },
      },
      organization_id: {
        allowNull: false,
        type: DataTypes.STRING, // now added
        references: {
          model: "organizations",
          key: "id",
        },
        validate: {
          isOrgIdValidation,
        },
      },
      encrypted_password: {
        allowNull: false,
        type: DataTypes.STRING,
        // validate: {
        //     isLengthValid(value: string) {
        //         isPasswordValidation(value);
        //     }
        // }
      },
      password: {
        type: DataTypes.VIRTUAL,
        set(val: string) {
          this.setDataValue("password", val);
        },
        validate: {
          isLengthValid(value: string) {
            isPasswordValidation(value);
          },
        },
      },
      password_confirmation: {
        type: DataTypes.VIRTUAL,
        set(val: string) {
          this.setDataValue("password_confirmation", val);
        },
      },
      otp_counter: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_otp_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // confirmed_at: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      // },
      last_otp_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      otp_secret_key: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // resent_otp_counter: {
      //   type: DataTypes.INTEGER,
      //   defaultValue: 0,
      // },
      // last_otp_sent_at: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      // },
      // sigin_in_count: {
      //   type: DataTypes.INTEGER,
      //   defaultValue: 0,
      // },
      current_sign_in_at: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      // last_sign_in_at: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      // },
      access_token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
    }
  );
  UserModel.prototype.isSuperAdmin = function (): boolean {
    return this.role === USER_ROLE.SUPER_ADMIN; // ??
  };
  UserModel.prototype.isAdmin = function (): boolean {
    return this.role === USER_ROLE.ADMIN; // ??
  };

  UserModel.prototype.isUser = function (): boolean {
    return this.role === USER_ROLE.USER;   // ??
  };
  return UserModel;
}

export default User;
