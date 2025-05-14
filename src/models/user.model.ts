import { DataTypes } from "sequelize";
import { sequelize } from "../database/psql";

// Project Table model schema
const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM({ values: ["ADMIN", "TASK_CREATOR", "USER"] }),
      defaultValue: "USER",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: { isEmail: true },
    },
  },
  { freezeTableName: true, tableName: "users", timestamps: true }
);

export default User;
