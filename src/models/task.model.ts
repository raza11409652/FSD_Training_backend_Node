import { DataTypes } from "sequelize";
import { sequelize } from "../database/psql";
import Project from "./project.model";
import User from "./user.model";
// import Project from "./project.model";

// Task Table model schema
const Task = sequelize.define(
  "tasks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "CREATED",
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    project: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //   references: "projects",
      references: {
        model: Project,
        key: "id",
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  },
  { freezeTableName: true, tableName: "tasks", timestamps: true }
);
export default Task;
