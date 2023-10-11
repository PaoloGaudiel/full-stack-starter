// 'use strict';
// const {
//   Model
// } = require('sequelize');
// replace this with newer code

import { Model, Op } from 'sequelize';

// module.exports = (sequelize, DataTypes) => {
export default function(sequelize, DataTypes) {
  class Idol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Idol.init({
    stageName: DataTypes.STRING,
    groupName: DataTypes.STRING,
    legalName: DataTypes.STRING,
    nationality: DataTypes.STRING,
    birthday: DataTypes.STRING,
    height: DataTypes.STRING,
    mbti: DataTypes.STRING,
    repEmoji: DataTypes.STRING,
    portrait: DataTypes.TEXT,
    groupPicture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Idol',
  });
  return Idol;
};