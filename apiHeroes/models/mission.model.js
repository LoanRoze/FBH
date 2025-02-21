import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Mission = sequelize.define(
  "missions",
  {
    mission_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    mission_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mission_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mission_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mission_isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    mission_rank: {
      type: DataTypes.JSON,
      allowNull: false
    },
  },
);

export default Mission;
