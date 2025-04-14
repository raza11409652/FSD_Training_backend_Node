import { DataTypes } from "sequelize";
import { sequelize } from "../database/psql";

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
