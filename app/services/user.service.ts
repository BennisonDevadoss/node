// import User from "../models/users"
import db from "../models";
import logger from "../logger";
import { generateTokenforTemp } from "../lib/jwt-handler";
import {
  OTPVerifyAttributes,
  SigninAttributes,
  UserCreationAttributes,
} from "../types/user";
import { UserInstance } from "../models/users";
import {
  generateOtp,
  generateOtpSecretKey,
  verifyOtp as OtpVerify,
} from "../lib/otp-handler";
import { verifyPassword } from "./session.service";
import { sendInvitationLink, sendOTP } from "../lib/node-mailer";
import AssociationValidationError from "../lib/validation-association-error-msg";
import { RESET_PASSWORD_URL } from "../config";
// import { verifyOtp as OtpVerify } from "../lib/otp-handler";

const { User } = db;
// console.log("user from the user.service file", User); //

function frameUserLog(activity, currentUser) {
  const { organization } = currentUser;
  return {
    activity,
    user_id: currentUser.id,
    user_name: currentUser.name,
    user_role: currentUser.role,
    organization_name: organization?.name || "",
    organization_id: organization?.id || "",
  };
}

async function create(
  attributes: UserCreationAttributes,
  currentUser: UserInstance
) {
  return User.create(attributes).then((user) => {
    const info = frameUserLog("User Creation", currentUser);
    logger.info(
      info,
      `User ${currentUser.name} (user_id: ${currentUser.id}, role: ${currentUser.role}) has createed a new user ${user.name} (id: ${user.id}, role: ${user.role})`
    );
    const tokenParams = {
      userId: user.id,
      email: user.email,
      currentSiginInAt: user.current_sigin_in_at, // this is not finished yet
    };
    const token = generateTokenforTemp(tokenParams);
    const resetPasswordUrl = `${RESET_PASSWORD_URL}?password_token=${token}`;
    sendInvitationLink(attributes.email, resetPasswordUrl, user.name);
    /* Make reset passsword url here and call invitationLink function here */
    return user;
  });
}

async function findConfirmedUserByEmail(email: string) {
  const user = await User.findOne({ where: { email: email } });
  console.log("is findConfirmdUserByEmail working", user);
  return user;
}

function signin(attributes: SigninAttributes) {
  return findConfirmedUserByEmail(attributes.email).then(async (user) => {
    // console.log("User is ", user);
    if (user) {
      const otpSecretKey = await generateOtpSecretKey();
      const updatedUser = await user.update({ otp_secret_key: otpSecretKey }); // Why this is not taken as a sequelize function
      const isValid = await verifyPassword(updatedUser, attributes.password); // worked
      if (isValid) {
        const otp = generateOtp(updatedUser.otp_secret_key);
        console.log("OTP is", otp);
        sendOTP(attributes.email, otp, updatedUser.name);
        return otp;
      }
      throw new AssociationValidationError("Invalid email or password");
    } else {
      throw new AssociationValidationError(
        "This email id is not registered with us. Please contact admin"
      );
    }
  });
}

async function verifyOtp(attributes: OTPVerifyAttributes) {
  const user: UserInstance = await findConfirmedUserByEmail(attributes.email);
  if (user) {
    const isOtpValid = await OtpVerify(user.otp_secret_key, attributes.otp);
    console.log("is OTP being verified", isOtpValid);
    const currentDate = new Date();
    user.is_otp_verified = !!isOtpValid;
    console.log("is_otp_verified", user.is_otp_verified);
    // if (user.is_otp_verified) {
    // }
    return user;
  }
  throw new AssociationValidationError("No User found");
}

export { create, signin, verifyOtp };
