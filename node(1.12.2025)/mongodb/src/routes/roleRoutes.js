const express = require("express");
const {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole
} = require("../controllers/roleController");

const router = express.Router();

router.post("/", createRole);
router.get("/", getRoles);
router.get("/:id", getRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
