const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const {
  getUsersController,
  getRegistrationsController,
  getCoursesController,
  getWorkshopsController,
  createCourseController,
  createWorkshopController,
} = require("../controllers/admin.controller");
const { createCourseSchema, createWorkshopSchema } = require("../validators/admin.validator");

const router = express.Router();

router.use(authMiddleware, roleMiddleware("admin"));
router.get("/users", getUsersController);
router.get("/registrations", getRegistrationsController);
router.get("/courses", getCoursesController);
router.get("/workshops", getWorkshopsController);
router.post("/course", validate(createCourseSchema), createCourseController);
router.post("/workshop", validate(createWorkshopSchema), createWorkshopController);

module.exports = router;
