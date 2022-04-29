import bcrypt from "bcrypt";
import { UserAttributes } from "../types/user";

function verifyPassword(user: UserAttributes, passsword: string) {
  const isMatched =
    user && bcrypt.compareSync(passsword, user.encrypted_password);
  console.log("isMatched ", isMatched);
  return isMatched;
}

export { verifyPassword };
