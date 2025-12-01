const Employee = require("../models/Employee");


// Allowed fields for PATCH
const allowedPatchFields = ["name", "email", "salary", "department", "role", "skills"];

// Create Employee
exports.createEmployee = async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    const populatedEmp = await emp.populate("department role");
    return res.status(201).json({ success: true, data: populatedEmp });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Get All Employees
exports.getEmployees = async (req, res) => {
  try {
    let { page = 1, limit = 10, sort = "-createdAt", q } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } }
      ];
    }

    const total = await Employee.countDocuments(filter);
    const employees = await Employee.find(filter)
      .populate("department", "name location")
      .populate("role", "title level")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json({ success: true, page, limit, total, data: employees });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Get Employee by ID
exports.getEmployee = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id)
      .populate("department", "name location")
      .populate("role", "title level");

    if (!emp)
      return res.status(404).json({ success: false, error: "Employee not found" });

    return res.json({ success: true, data: emp });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// PATCH — Partial Update with Field Restriction
exports.updateEmployee = async (req, res) => {
  try {
    // Check if fields being updated are allowed
    const updates = Object.keys(req.body);
    const isValid = updates.every((field) => allowedPatchFields.includes(field));

    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: "Invalid field in PATCH request"
      });
    }

    // Update employee
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate("department", "name location")
      .populate("role", "title level");

    if (!emp) {
      return res.status(404).json({
        success: false,
        error: "Employee not found"
      });
    }

    return res.json({ success: true, data: emp });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
// PUT — Replace Employee
exports.replaceEmployee = async (req, res) => {
  try {
    await Employee.replaceOne({ _id: req.params.id }, req.body, { upsert: false });
    const emp = await Employee.findById(req.params.id)
      .populate("department", "name location")
      .populate("role", "title level");

    if (!emp)
      return res.status(404).json({ success: false, error: "Employee not found" });

    return res.json({ success: true, data: emp });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id)
      .populate("department", "name location")
      .populate("role", "title level");

    if (!emp)
      return res.status(404).json({ success: false, error: "Employee not found" });

    return res.json({ success: true, data: emp });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
