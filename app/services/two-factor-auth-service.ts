import { getByEmail } from "./user.service";
import { ResendOtpAttributes } from "../types/user";
import { generateOtp } from "../lib/otp-handler";
import { sendOTP } from "../lib/node-mailer";

function otpResend(attributes: ResendOtpAttributes) {
  return getByEmail(attributes.email).then((user) => {
    const counterParams = {
      resent_otp_counter: user.resent_otp_counter + 1,
      last_otp_sent_at: new Date(),
    };
    const otp = generateOtp(user.otp_secret_key);
    user.update(counterParams);
    sendOTP(attributes.email, otp, user.name);
    return otp;
  });
}
export { otpResend };
