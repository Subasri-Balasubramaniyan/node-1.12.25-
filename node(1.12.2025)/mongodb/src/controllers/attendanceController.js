const Attendance = require("../models/Attendance");

// Create attendance
exports.createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all
exports.getAttendances = async (req, res) => {
  try {
    const data = await Attendance.find()
      .populate("employee", "name email")
      .sort("-createdAt");

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get by ID
exports.getAttendance = async (req, res) => {
  try {
    const data = await Attendance.findById(req.params.id).populate("employee");

    if (!data) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update
exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!attendance) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, message: "Attendance deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
