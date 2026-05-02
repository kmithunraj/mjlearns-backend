module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
      capacity: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "courses",
      timestamps: true,
    }
  );

  Course.associate = (models) => {
    Course.hasMany(models.Registration, { foreignKey: "courseId", as: "registrations" });
  };

  return Course;
};
