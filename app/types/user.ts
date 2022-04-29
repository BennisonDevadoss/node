export const enum USER_ROLE {
  SUPER_ADMIN = 'Super Admin',
  ADMIN = 'Admin',
  USER = 'User',
}

export interface UserAttributes {
  id: bigint;
  name: string;
  email: string;
  role: USER_ROLE;
  organization_id: bigint | null;
  encrypted_password: string;
  password: string;
  password_confirmation: string;
  otp_counter: number;
  current_signin_at: Date;
  is_otp_verified: boolean;
  otp_secret_key: string;
  created_at: Date;
  updated_at: Date;
  created_by: bigint;
}

export type UserCreationAttributes = Pick<
  UserAttributes,
  'name' | 'email' | 'created_by' | 'role' | 'organization_id'
>;

export type UserUpdateAttributes = Pick<UserAttributes, 'name'>;

export type SigninAttributes = Pick<UserAttributes, 'email' | 'password'>;

export interface OTPVerifyAttributes {
  ip: string;
  email: string;
  otp: string;
}

export interface resetPasswordAttributes {
  userId: bigint;
  password_token: string;
  password: string;
  password_confirmation: string;
}

export interface ResendOtpAttributes {
  email: string;
}
