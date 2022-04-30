export const PASSWORD_LENGTH = 8;

export const USER_ROLES = ["Super Admin", "Admin", "User"];

export const APPLICATION_NAME = "ChiefNET API Server";

export const DEVICE_TYPE = ["Raspberry_Pi", "Virtual CPE", "G1"];

export const SPEAK_EASY_CONFIG = {
  SECRET_KEY_LENGTH: 20,
  DIGITS: 4,
  ENCODING: "base32",
  STEP: 1800,
};

export const { RESET_PASSWORD_URL } = process.env;

export const EMAIL_PATTERN = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
