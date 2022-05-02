import * as bcrypt from 'bcrypt';
import { forEach, split } from 'lodash';
import { DatabaseError, EmptyResultError } from 'sequelize';
import { EMAIL_PATTERN, RESET_PASSWORD_URL } from '../config';
import { generateTokenforTemp } from '../lib/jwt-handler';
import { sendInvitationLink, sendOTP } from '../lib/node-mailer';
import {
  generateOtp,
  generateOtpSecretKey,
  verifyOtp as OtpVerify,
} from '../lib/otp-handler';
import AssociationValidationError from '../lib/validation-association-error-msg';
import logger from '../logger';
import db from '../models';
import { UserInstance } from '../models/users';
import {
  OTPVerifyAttributes,
  SigninAttributes,
  UserCreationAttributes,
  UserUpdateAttributes,
} from '../types/user';
import { verifyPassword } from './session.service';

const { User } = db;

function frameUserLog(activity, currentUser) {
  const { organization } = currentUser;
  return {
    activity,
    user_id: currentUser.id,
    user_name: currentUser.name,
    user_role: currentUser.role,
    organization_name: organization?.name || '',
    organization_id: organization?.id || '',
  };
}

async function generateHase(string, saltRounds) {
  const hashPassword = await new Promise((resolve) => {
    bcrypt.hash(string, saltRounds).then((hash) => {
      resolve(hash);
    });
  });
  console.log('hash password is ', hashPassword);
  return hashPassword;
}

async function list(currentuser: UserInstance) {
  return User.findAll({ paranoid: false });
}

async function create(
  attributes: UserCreationAttributes,
  currentUser: UserInstance
) {
  console.log('attributes are', attributes);
  return await User.create(attributes).then((user) => {
    //
    const info = frameUserLog('User Creation', currentUser);
    logger.info(
      info,
      `User ${currentUser.name} (user_id: ${currentUser.id}, role: ${currentUser.role}) has createed a new user ${user.name} (id: ${user.id}, role: ${user.role})`
    );
    const tokenParams = {
      userId: user.id,
      email: user.email,
      currentSiginInAt: user.current_sigin_in_at,
    };
    const token = generateTokenforTemp(tokenParams);
    console.log('Token is', token);
    const resetPasswordUrl = `${RESET_PASSWORD_URL}?password_token=${token}`;
    sendInvitationLink(attributes.email, resetPasswordUrl, user.name);
    return user;
  });
}

async function findConfirmedUserByEmail(email: string) {
  if (email.match(EMAIL_PATTERN)) {
    const user = await User.findOne({ where: { email } });
    console.log('is findConfirmdUserByEmail working', user);
    return user;
  }
  throw new AssociationValidationError('Email should be valid format');
}

function signin(attributes: SigninAttributes) {
  console.log('attributes is', attributes);
  console.log('attributes.email is', attributes.email);
  return findConfirmedUserByEmail(attributes.email).then(async (user) => {
    console.log('User is ', user);
    if (user) {
      const otpSecretKey = await generateOtpSecretKey();
      const updatedUser = await user.update({
        otp_secret_key: otpSecretKey,
      });
      const isValid = await verifyPassword(updatedUser, attributes.password);
      if (isValid) {
        const otp = generateOtp(updatedUser.otp_secret_key);
        console.log('OTP is', otp);
        sendOTP(attributes.email, otp, updatedUser.name);
        return otp;
      }
      throw new AssociationValidationError('Invalid email or password');
    } else {
      throw new AssociationValidationError(
        'This email id is not registered with us. Please contact admin'
      );
    }
  });
}

async function verifyOtp(attributes: OTPVerifyAttributes) {
  const user: UserInstance = await findConfirmedUserByEmail(attributes.email);
  if (user) {
    const isOtpValid = await OtpVerify(user.otp_secret_key, attributes.otp);
    console.log('is OTP being verified', isOtpValid);
    const currentDate = new Date();
    user.is_otp_verified = !!isOtpValid;
    user.current_signin_at = currentDate;
    console.log('is_otp_verified', user.is_otp_verified);
    return user;
  }
  throw new AssociationValidationError('No User found');
}

async function getById(id: bigint) {
  return await User.findOne({ where: { id } }).then((user) => {
    if (user) {
      return user;
    }
    throw new EmptyResultError('No user found');
  });
}

function getByEmail(email: string) {
  return User.findOne({ where: { email } }).then((user: UserInstance) => {
    if (user) {
      return user;
    }
    throw new EmptyResultError('No user found');
  });
}

function update(
  id: bigint,
  attributes: UserUpdateAttributes,
  currentUser: UserInstance
) {
  return getById(id).then((user: UserInstance) => {
    const UpdateAttributes: UserUpdateAttributes = {
      name: attributes.name,
    };
    return user.update(UpdateAttributes).then((userData) => {
      const info = frameUserLog('User Updation', currentUser);
      logger.info(
        info,
        `User ${currentUser.name} (user_id: ${currentUser.id}, role:${currentUser.role} has updated the user ${userData.name} (id: ${userData.id}))`
      );
      return userData;
    });
  });
}

function destroy(ids: string, currentUser: UserInstance) {
  const userIds = split(ids, ',');
  console.log('User ids are', userIds);
  return User.destroy({ where: { id: userIds } })
    .then((users) => {
      console.log('is this works 1');
      forEach(users, (users) => {
        console.log('is this works 2');
        const info = frameUserLog('User Deletion', currentUser);
        logger.info(
          info,
          `User ${currentUser.name} (user_id: ${currentUser.id}, role: ${currentUser.role}) has deleted the user ${users.name} (id: ${users.id})`
        );
      });
      return users;
    })
    .catch((error: any) => {
      if (error instanceof DatabaseError) {
        throw new DatabaseError({
          message: 'Bad reequest please check parameters',
          name: 'DatabaseError',
        });
      }
    });
}
export {
  create,
  signin,
  list,
  update,
  destroy,
  verifyOtp,
  getById,
  getByEmail,
  generateHase,
};
