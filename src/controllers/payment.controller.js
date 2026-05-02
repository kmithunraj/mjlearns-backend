const asyncHandler = require("../utils/asyncHandler");
const { createPaymentOrder, verifyPayment } = require("../services/payment.service");

const createOrderController = asyncHandler(async (req, res) => {
  const order = await createPaymentOrder({
    registrationId: req.body.registrationId,
    userId: req.user.id,
  });
  res.status(200).json(order);
});

const verifyPaymentController = asyncHandler(async (req, res) => {
  const registration = await verifyPayment({
    registrationId: req.body.registrationId,
    userId: req.user.id,
    razorpayOrderId: req.body.razorpayOrderId,
    razorpayPaymentId: req.body.razorpayPaymentId,
    razorpaySignature: req.body.razorpaySignature,
  });
  res.status(200).json({
    message: "Payment verified successfully",
    registration,
  });
});

module.exports = { createOrderController, verifyPaymentController };
