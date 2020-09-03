import bcrypt from "bcrypt";

export default class Helpers {
  static encryptPassword(password) {
    return bcrypt.hashSync(password, 8);
  }

  static comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
}
