const asyncHandler = require("../utils/asyncHandler");
const {
  listUsers,
  listRegistrations,
  listCoursesAdmin,
  listWorkshopsAdmin,
  createCourse,
  createWorkshop,
} = require("../services/admin.service");

const parsePagination = (query) => ({
  page: Number(query.page || 1),
  limit: Math.min(Number(query.limit || 20), 100),
});

const getUsersController = asyncHandler(async (req, res) => {
  const result = await listUsers(parsePagination(req.query));
  res.status(200).json(result);
});

const getRegistrationsController = asyncHandler(async (req, res) => {
  const result = await listRegistrations(parsePagination(req.query));
  res.status(200).json(result);
});

const getCoursesController = asyncHandler(async (req, res) => {
  res.status(200).json(await listCoursesAdmin());
});

const getWorkshopsController = asyncHandler(async (req, res) => {
  res.status(200).json(await listWorkshopsAdmin());
});

const createCourseController = asyncHandler(async (req, res) => {
  const course = await createCourse(req.body);
  res.status(201).json(course);
});

const createWorkshopController = asyncHandler(async (req, res) => {
  const workshop = await createWorkshop(req.body);
  res.status(201).json(workshop);
});

module.exports = {
  getUsersController,
  getRegistrationsController,
  getCoursesController,
  getWorkshopsController,
  createCourseController,
  createWorkshopController,
};
