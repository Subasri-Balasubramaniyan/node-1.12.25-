const Department = require("../models/Department");

// Create Department
exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json({ success: true, data: department });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all with pagination and sorting
exports.getDepartments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "createdAt";

    const departments = await Department.find()
      .skip(skip)
      .limit(limit)
      .sort(sort);

    const total = await Department.countDocuments();

    res.json({ success: true, total, page, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get one
exports.getDepartment = async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id);
    if (!dept) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: dept });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update
exports.updateDepartment = async (req, res) => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dept) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: dept });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete
exports.deleteDepartment = async (req, res) => {
  try {
    const dept = await Department.findByIdAndDelete(req.params.id);
    if (!dept) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, message: "Department removed" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
