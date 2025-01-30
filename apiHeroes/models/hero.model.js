import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Hero = sequelize.define(
  "heroes",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    powerDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    defaultScope: {
      where: {
        isDeleted: false,
      },
    },
    scopes: {
      deleted: {
        where: {
          isDeleted: true,
        },
      },
      withDeleted: {},
    },
  }
);

export default Hero;
