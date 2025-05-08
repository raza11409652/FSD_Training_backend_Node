import { DataTypes } from "sequelize";
import { sequelize } from "../database/psql";
import User from "./user.model";

// Project Table model schema
const Project = sequelize.define(
  "projects",
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    // uid: {
    //   type: DataTypes.STRING,
    //   unique: true,
    //   allowNull: false,
    // },
  },
  { freezeTableName: true, tableName: "projects", timestamps: true }
);

// export type ProjectI = typeof Project.schema;
export default Project;

// const obj: ProjectI = { name: "" };
