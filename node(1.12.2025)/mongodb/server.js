require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./src/config/db");

const app = express();

// ===========================
// Middlewares
// ===========================
app.use(express.json());     // Body parser
app.use(morgan("dev"));      // Logging

// ===========================
// Database Connection
// ===========================
connectDB();

// ===========================
// Test Route
// ===========================
app.get("/", (req, res) => {
  res.send("API Running");
});

// ===========================
// Routes (Placed After Middlewares)
// ===========================
const employeeRoutes = require("./src/routes/employeeRoutes");
app.use("/api/employees", employeeRoutes);

// Future: Departments, Roles, Attendance
const departmentRoutes = require("./src/routes/departmentRoutes");
app.use("/api/departments", departmentRoutes);

const roleRoutes = require("./src/routes/roleRoutes");
app.use("/api/roles", roleRoutes);

const attendanceRoutes = require("./src/routes/attendanceRoutes");
app.use("/api/attendance", attendanceRoutes);

// ===========================
// Start Server
// ===========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
