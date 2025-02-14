import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Hero from "./hero.model.js";
import Mission from "./mission.model.js";

const Mission_Hero = sequelize.define(
  "mission_hero",
  {
    mission_hero_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    hero_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Hero,
        key: hero_id,
      }
    },
    mission_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Mission,
        key: mission_id,
      }
    },
  },
);

export default Mission_Hero;
