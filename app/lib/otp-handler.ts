import speakeasy from "speakeasy";
import { SPEAK_EASY_CONFIG } from "../config";

function generateOtpSecretKey() {
  const secretKey = speakeasy.generateSecret({
    length: SPEAK_EASY_CONFIG.SECRET_KEY_LENGTH,
  });
  return secretKey.base32;
}

function generateOtp(secret: string) {
  return speakeasy.totp({
    secret,
    encoding: SPEAK_EASY_CONFIG.ENCODING,
    digits: SPEAK_EASY_CONFIG.DIGITS,
    step: SPEAK_EASY_CONFIG.STEP,
  });
}

function verifyOtp(secret: string, token: string) {
  return speakeasy.totp.verify({
    secret,
    token,
    encoding: SPEAK_EASY_CONFIG.ENCODING,
    digits: SPEAK_EASY_CONFIG.DIGITS,
    step: SPEAK_EASY_CONFIG.STEP,
  });
}
export { generateOtpSecretKey, generateOtp, verifyOtp };
