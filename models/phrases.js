'use strict';
module.exports = (sequelize, DataTypes) => {
  const Phrases = sequelize.define('Phrases', {
    phrase: DataTypes.STRING,
    author: DataTypes.STRING
  }, {});
  
  Phrases.associate = function(models) {
    // associations can be defined here
  };
  return Phrases;
};