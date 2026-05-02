const crypto = require("crypto");
const razorpayClient = require("../config/razorpay");
const { Registration } = require("../models");
const ApiError = require("../utils/apiError");
const { getRegistrationAmount } = require("./registration.service");

const createPaymentOrder = async ({ registrationId, userId }) => {
  if (!razorpayClient) throw new ApiError(500, "Razorpay is not configured");
  const registration = await Registration.findOne({
    where: { id: registrationId, userId },
  });
  if (!registration) throw new ApiError(404, "Registration not found");
  if (registration.paymentStatus === "paid") {
    throw new ApiError(400, "Payment already completed");
  }

  const amount = await getRegistrationAmount(registration);
  const order = await razorpayClient.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt: `registration_${registration.id}`,
  });

  registration.razorpayOrderId = order.id;
  await registration.save();
  return order;
};

const verifyPayment = async ({
  registrationId,
  userId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  const registration = await Registration.findOne({
    where: { id: registrationId, userId },
  });
  if (!registration) throw new ApiError(404, "Registration not found");
  if (registration.razorpayOrderId !== razorpayOrderId) {
    throw new ApiError(400, "Order mismatch");
  }

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (generatedSignature !== razorpaySignature) {
    registration.paymentStatus = "failed";
    await registration.save();
    throw new ApiError(400, "Invalid payment signature");
  }

  registration.paymentStatus = "paid";
  registration.razorpayPaymentId = razorpayPaymentId;
  await registration.save();

  return registration;
};

module.exports = { createPaymentOrder, verifyPayment };
