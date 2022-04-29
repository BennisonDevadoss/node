import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET_KEY } = process.env;

interface UserAttributes {
  userId: bigint;
  email: string;
  currentSiginInAt: Date;
}
function generateToken(user: UserAttributes) {
  console.log("JWT_TOKEN_IS", JWT_SECRET_KEY);
  console.log("user is ", user);
  const token = jwt.sign(user, JWT_SECRET_KEY);
  console.log("Token is", token);
  return token;
}

function verifyToken(token: string, secretKey: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err: string, decoded: UserAttributes) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

function generateTokenforTemp(user) {
  return jwt.sign(user, JWT_SECRET_KEY, { expiresIn: "30min" });
}

function verifyTempToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      JWT_SECRET_KEY,
      { expiresIn: "30min" },
      (err: string, decoded: UserAttributes) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      }
    );
  });
}

export { generateToken, verifyToken, generateTokenforTemp, verifyTempToken };
