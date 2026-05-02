const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { createOrderController, verifyPaymentController } = require("../controllers/payment.controller");
const { createOrderSchema, verifyPaymentSchema } = require("../validators/payment.validator");

const router = express.Router();

router.post("/create-order", authMiddleware, validate(createOrderSchema), createOrderController);
router.post("/verify", authMiddleware, validate(verifyPaymentSchema), verifyPaymentController);

module.exports = router;
