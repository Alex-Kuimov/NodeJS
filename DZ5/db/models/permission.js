module.exports = (sequelize, DataTypes) => {
    const permission = sequelize.define('permission', {
        user_id: DataTypes.INTEGER,
        settings_C: DataTypes.BOOLEAN,
        settings_R: DataTypes.BOOLEAN,
        settings_U: DataTypes.BOOLEAN,
        settings_D: DataTypes.BOOLEAN,
        news_C: DataTypes.BOOLEAN,
        news_R: DataTypes.BOOLEAN,
        news_U: DataTypes.BOOLEAN,
        news_D: DataTypes.BOOLEAN,
        chat_C: DataTypes.BOOLEAN,
        chat_R: DataTypes.BOOLEAN,
        chat_U: DataTypes.BOOLEAN,
        chat_D: DataTypes.BOOLEAN,
    }, {});
    permission.associate = function(models) {
      // associations can be defined here
    };
    return permission;
  };