const mongoose = require("mongoose");
const RoleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model("Role", RoleSchema);
