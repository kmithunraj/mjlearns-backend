const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const paymentRoutes = require("./payment.routes");
const adminRoutes = require("./admin.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/", userRoutes);
router.use("/payment", paymentRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
