const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RolePermissions extends Model {
    static associate(models) {
      RolePermissions.belongsTo(models.Permission, {
        foreignKey: "permissionId",
        as: "permission",
      });

      RolePermissions.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "role",
      });
    }
  }

  RolePermissions.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
        onDelete: "RESTRICT",
      },

      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "permissions",
          key: "id",
        },
        onDelete: "RESTRICT",
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RolePermissions",
      tableName: "role_permissions",

      indexes: [
        {
          unique: true,
          fields: ["roleId", "permissionId"],
        },
      ],
    }
  );

  return RolePermissions;
};