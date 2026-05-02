module.exports = (sequelize, DataTypes) => {
  const Workshop = sequelize.define(
    "Workshop",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      capacity: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "workshops",
      timestamps: true,
    }
  );

  Workshop.associate = (models) => {
    Workshop.hasMany(models.Registration, { foreignKey: "workshopId", as: "registrations" });
  };

  return Workshop;
};
