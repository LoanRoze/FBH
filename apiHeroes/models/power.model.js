import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Power = sequelize.define(
  "powers",
  {
    power_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    power_label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    power_isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    defaultScope: {
      where: {
        power_isDeleted: false,
      },
    },
    scopes: {
      deleted: {
        where: {
          power_isDeleted: true,
        },
      },
      withDeleted: {},
    },
  }
);

export default Power;
