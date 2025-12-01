const mongoose = require("mongoose");
const AttendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["present","absent","leave"], default: "present" }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
