const { Course, Workshop, User, Registration } = require("../models");

const listUsers = async ({ page, limit }) =>
  User.findAndCountAll({
    offset: (page - 1) * limit,
    limit,
    order: [["createdAt", "DESC"]],
  });

const listRegistrations = async ({ page, limit }) =>
  Registration.findAndCountAll({
    include: ["user", "course", "workshop"],
    offset: (page - 1) * limit,
    limit,
    order: [["createdAt", "DESC"]],
  });

const listCoursesAdmin = async () => Course.findAll({ order: [["createdAt", "DESC"]] });
const listWorkshopsAdmin = async () => Workshop.findAll({ order: [["createdAt", "DESC"]] });
const createCourse = async (payload) => Course.create(payload);
const createWorkshop = async (payload) => Workshop.create(payload);

module.exports = {
  listUsers,
  listRegistrations,
  listCoursesAdmin,
  listWorkshopsAdmin,
  createCourse,
  createWorkshop,
};
