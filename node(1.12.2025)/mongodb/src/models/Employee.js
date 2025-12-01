const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  salary: { type: Number, default: 0 },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  skills: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Employee", EmployeeSchema);
