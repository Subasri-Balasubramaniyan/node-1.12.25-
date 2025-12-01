const express = require("express");
const {
  createAttendance,
  getAttendances,
  getAttendance,
  updateAttendance,
  deleteAttendance
} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/", createAttendance);
router.get("/", getAttendances);
router.get("/:id", getAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;
