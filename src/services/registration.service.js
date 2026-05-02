const { Op } = require("sequelize");
const { Course, Workshop, Registration } = require("../models");
const ApiError = require("../utils/apiError");

const listCourses = async () => Course.findAll({ order: [["createdAt", "DESC"]] });

const listWorkshops = async (userId) => {
  const rows = await Workshop.findAll({ order: [["createdAt", "DESC"]] });
  let registeredWorkshopIds = new Set();
  if (userId) {
    const regs = await Registration.findAll({
      where: {
        userId,
        workshopId: { [Op.ne]: null },
        paymentStatus: { [Op.in]: ["pending", "paid"] },
      },
      attributes: ["workshopId"],
      raw: true,
    });
    registeredWorkshopIds = new Set(regs.map((r) => r.workshopId).filter(Boolean));
  }
  return rows.map((w) => {
    const plain = w.get({ plain: true });
    return {
      ...plain,
      registered: Boolean(userId && registeredWorkshopIds.has(plain.id)),
    };
  });
};

const getRegistrationAmount = async (registration) => {
  if (registration.courseId) {
    const course = await Course.findByPk(registration.courseId);
    if (!course) throw new ApiError(404, "Course not found");
    return Number(course.price);
  }
  const workshop = await Workshop.findByPk(registration.workshopId);
  if (!workshop) throw new ApiError(404, "Workshop not found");
  return Number(workshop.price);
};

const checkCapacity = async ({ courseId, workshopId }) => {
  if (courseId) {
    const course = await Course.findByPk(courseId);
    if (!course) throw new ApiError(404, "Course not found");
    const used = await Registration.count({
      where: { courseId, paymentStatus: "paid" },
    });
    if (used >= course.capacity) throw new ApiError(400, "Course capacity reached");
    return;
  }

  const workshop = await Workshop.findByPk(workshopId);
  if (!workshop) throw new ApiError(404, "Workshop not found");
  const used = await Registration.count({
    where: { workshopId, paymentStatus: "paid" },
  });
  if (used >= workshop.capacity) throw new ApiError(400, "Workshop capacity reached");
};

const createRegistration = async ({ userId, courseId, workshopId }) => {
  await checkCapacity({ courseId, workshopId });

  return Registration.create({
    userId,
    courseId: courseId || null,
    workshopId: workshopId || null,
    paymentStatus: "pending",
  });
};

module.exports = { listCourses, listWorkshops, createRegistration, getRegistrationAmount };
