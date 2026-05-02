module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ["passwordHash"] },
      },
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Registration, { foreignKey: "userId", as: "registrations" });
  };

  return User;
};
