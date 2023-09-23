// Account.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../../sequelize-config";

class Account extends Model {
  public id!: number;
  public accountNumber!: string;
  public balance!: number;
  public userId!: number;
  public type!: string;
  public interestRate!: any;
  public overdraftLimit!: any;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Account.belongsTo(models.User, { foreignKey: "userId" });
  }

  public async setInterestRate(interest: number): Promise<void> {
    this.interestRate =interest
  }

  public async setOverDraftLimit(overDraftLimit: number): Promise<void> {
    this.interestRate =overDraftLimit
  }

  
}


Account.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    accountNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    interestRate:{
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    overdraftLimit:{
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: "accounts",
    modelName: "Account",
  }
);

export default Account;
