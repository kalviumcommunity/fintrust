import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../../sequelize-config";
import bcrypt from "bcrypt";
class User extends Model {
  public id!: number;
  public username!: string;
  private password!: string;
  public email!: string;
  public phoneNumber!: string;
  public roles!: string[];
  public address!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  public async setPassword(password: string): Promise<void> {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }

  public async checkPassword(password: string): Promise<boolean> {
    if (!this.password) {
      console.log(password)
      return false;
    }
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      
      type: DataTypes.NUMBER,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
  }
);

export default User;
