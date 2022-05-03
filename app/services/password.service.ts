import { RESET_PASSWORD_URL } from "../config";
import { generateTokenforTemp } from "../lib/jwt-handler";
import { sendResetLink } from "../lib/node-mailer";
import { UserInstance } from "../models/users";
import { ResendOtpAttributes, resetPasswordAttributes } from "../types/user";
import { generateHase, getByEmail, getById } from "./user.service";

async function resetPassword(attributes: resetPasswordAttributes) {
  try {
    const user = await getById(attributes.userId);
    console.log("User is when get reset the password", user);
    console.log("Attributes is", attributes);
    const encryptedPassword = await generateHase(attributes.password, 10);
    console.log("EncryptedPassword is", encryptedPassword);
    const UserAttributes = {
      // mentionn type here
      encrypted_password: encryptedPassword,
      password: attributes.password,
      password_confirmation: attributes.password_confirmation,
      confirmed_at: new Date(),
    };
    return await user.update(UserAttributes);
  } catch (error) {
    throw error;
  }
}

async function generateResetPasswordLink(attributes: ResendOtpAttributes) {
  return getByEmail(attributes.email).then((user: UserInstance) => {
    const tokenParams = {
      userId: user.id,
      email: user.email,
      currentSignInAt: user.current_signin_at,
    };
    const token = generateTokenforTemp(tokenParams);
    const resetPasswordUrl = `${RESET_PASSWORD_URL}?password_token=${token}`;
    console.log("Reset password URL is", resetPasswordUrl);  //
    sendResetLink(attributes.email, resetPasswordUrl, user.name);
    return user;
  });
}

export { resetPassword, generateResetPasswordLink };
