const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        through: "role_permissions",
        foreignKey: "permissionId",
        otherKey: "roleId", 
        as: "roles",
      });


    }
  }
  Permission.init(
    {
    
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Permission",
      tableName: "permissions",
    },
  );
  return Permission;
};
