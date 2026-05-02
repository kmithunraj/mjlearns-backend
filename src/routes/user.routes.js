const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { registrationSchema } = require("../validators/register.validator");
const {
  getCoursesController,
  getWorkshopsController,
  registerController,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/courses", getCoursesController);
router.get("/workshops", getWorkshopsController);
router.post("/register", authMiddleware, validate(registrationSchema), registerController);

module.exports = router;
