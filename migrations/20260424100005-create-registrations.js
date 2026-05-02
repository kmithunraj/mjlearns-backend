"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("registrations", {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "courses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      workshopId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "workshops", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      paymentStatus: {
        type: Sequelize.ENUM("pending", "paid", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      razorpayOrderId: { type: Sequelize.STRING, allowNull: true },
      razorpayPaymentId: { type: Sequelize.STRING, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.addIndex("registrations", ["userId"]);
    await queryInterface.addIndex("registrations", ["courseId"]);
    await queryInterface.addIndex("registrations", ["workshopId"]);
    await queryInterface.sequelize.query(`
      ALTER TABLE "registrations"
      ADD CONSTRAINT "registrations_exactly_one_item_check"
      CHECK (
        ("courseId" IS NOT NULL AND "workshopId" IS NULL)
        OR ("courseId" IS NULL AND "workshopId" IS NOT NULL)
      );
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("registrations");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_registrations_paymentStatus";');
  },
};
