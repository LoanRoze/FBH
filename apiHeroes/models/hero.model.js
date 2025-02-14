import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Power from "./power.model.js";

const Hero = sequelize.define(
  "heroes",
  {
    hero_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    hero_alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hero_identity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hero_powerDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hero_isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    hero_rank: {
      type: DataTypes.JSON,
      allowNull: false
    },
    hero_power_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Power,
        key: power_id,
      }
    }
  },
  {
    defaultScope: {
      where: {
        hero_isDeleted: false,
      },
    },
    scopes: {
      deleted: {
        where: {
          hero_isDeleted: true,
        },
      },
      withDeleted: {},
    },
  }
);

export default Hero;
