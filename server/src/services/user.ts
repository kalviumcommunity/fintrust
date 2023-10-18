import UserBase from "../models/UserClass";
const bcrypt = require("bcrypt");


class User extends UserBase {

  private password!:any;
  constructor(user: any) {
    super(user)
  }

  public async createUser(password:any) {
    try {

      this.password = await bcrypt.hash(password, 10);
      const result = await this.db.execute(
        "INSERT INTO users (username, password, email, phoneNumber,role_id) VALUES (?, ?, ?, ?, ?,?)",
        [this.username, this.password, this.email, this.phoneNumber, this.role || null]
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getUserByUsername() {
    try {
      const [rows, fields] = await this.db.execute(
        "SELECT * FROM users WHERE username = ?",
        [this.username]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  public async getUserByUserid(id:number) {
    try {
      const [rows, fields] = await this.db.execute(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async comparePasswords(candidatePassword: any, hashedPassword: any) {
    try {
      return await bcrypt.compare(candidatePassword, hashedPassword);
    } catch (error) {
      throw error;
    }
  }

  public async checkDuplicate() {
    try {
      const [rows, fields] = await this.db.execute(
        "SELECT * FROM users WHERE email = ? OR username = ? OR phoneNumber = ?",
        [this.email, this.username, this.phoneNumber]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default User;
