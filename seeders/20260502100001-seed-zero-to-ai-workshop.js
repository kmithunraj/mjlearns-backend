"use strict";

const WORKSHOP_TITLE = "Zero to AI Developer — Live Workshop";

/** May 10, 2026 10:00 Asia/Kolkata */
const WORKSHOP_START = new Date("2026-05-10T04:30:00.000Z");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete("workshops", { title: WORKSHOP_TITLE }, {});

    await queryInterface.bulkInsert("workshops", [
      {
        title: WORKSHOP_TITLE,
        description:
          "What if I told you that the skill that pays ₹18 LPA in 2025 can be learned in 90 minutes? Not theory. Not slides. You'll BUILD it — live — on your phone. Free workshop. May 10. 10 AM. Are you in?",
        price: 0,
        date: WORKSHOP_START,
        capacity: 500,
        instructor: "Nandhini",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("workshops", { title: WORKSHOP_TITLE }, {});
  },
};
