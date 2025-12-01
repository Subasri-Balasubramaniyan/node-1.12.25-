const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/employeeController");
// GET /employees?page=1&limit=5
router.get("/employees", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;   // default page = 1
    const limit = parseInt(req.query.limit) || 5; // default limit = 5
    const skip = (page - 1) * limit;

    const totalEmployees = await Employee.countDocuments();
    const employees = await Employee.find().skip(skip).limit(limit);

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / limit),
      totalEmployees,
      employees
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/", ctrl.createEmployee);
router.get("/", ctrl.getEmployees);
router.get("/:id", ctrl.getEmployee);
router.patch("/:id", ctrl.updateEmployee);
router.put("/:id", ctrl.replaceEmployee);
router.delete("/:id", ctrl.deleteEmployee);

module.exports = router;
