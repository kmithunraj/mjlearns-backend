const asyncHandler = require("../utils/asyncHandler");
const {
  listCourses,
  listWorkshops,
  createRegistration,
} = require("../services/registration.service");

const getCoursesController = asyncHandler(async (req, res) => {
  const courses = await listCourses();
  res.status(200).json(courses);
});

const getWorkshopsController = asyncHandler(async (req, res) => {
  const workshops = await listWorkshops(req.user?.id ?? null);
  res.status(200).json(workshops);
});

const registerController = asyncHandler(async (req, res) => {
  const registration = await createRegistration({
    userId: req.user.id,
    courseId: req.body.courseId,
    workshopId: req.body.workshopId,
  });
  res.status(201).json({
    message: "Registration created. Complete payment to confirm seat.",
    registration,
  });
});

module.exports = { getCoursesController, getWorkshopsController, registerController };
