module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define(
    "Registration",
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      courseId: { type: DataTypes.INTEGER, allowNull: true },
      workshopId: { type: DataTypes.INTEGER, allowNull: true },
      paymentStatus: {
        type: DataTypes.ENUM("pending", "paid", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      razorpayOrderId: { type: DataTypes.STRING, allowNull: true },
      razorpayPaymentId: { type: DataTypes.STRING, allowNull: true },
    },
    {
      tableName: "registrations",
      timestamps: true,
    }
  );

  Registration.associate = (models) => {
    Registration.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Registration.belongsTo(models.Course, { foreignKey: "courseId", as: "course" });
    Registration.belongsTo(models.Workshop, { foreignKey: "workshopId", as: "workshop" });
  };

  return Registration;
};
