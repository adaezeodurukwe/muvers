import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;

export default class Helpers {
  static encryptPassword(password) {
    return bcrypt.hashSync(password, 8);
  }

  static comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  static generateToken(data) {
    return jwt.sign(data, secret);
  }
}
