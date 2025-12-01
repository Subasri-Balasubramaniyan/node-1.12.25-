# Employee Management System

This project demonstrates how to use **Sequelize** and **TypeORM** for managing an **Employee Database** with collections for Employees, Departments, Roles, and Attendance.

---

## Table of Contents

- [Technologies Used](#technologies-used)  
- [Project Setup](#project-setup)  
- [Database Structure](#database-structure)  
- [Sequelize Example](#sequelize-example)  
- [TypeORM Example](#typeorm-example)  
- [CRUD Operations](#crud-operations)  
- [Running the Project](#running-the-project)  

---

## Technologies Used

- Node.js  
- Sequelize (ORM for SQL Databases)  
- TypeORM (ORM for SQL and NoSQL Databases)  
- PostgreSQL / MySQL / SQLite  
- Express.js (optional for API)  
- JavaScript / TypeScript  

---

## Project Setup

1. Clone the repository:

```bash
git clone <repository_url>
cd <project_folder>
Install dependencies:

bash
Copy code
npm install
Configure database connection:

For Sequelize, update config/config.json or .env file with your database credentials.

For TypeORM, update DataSource config in data-source.ts or .env file.

Database Structure
Employee Collection
Field	Type	Description
id	Integer	Primary key
name	String	Employee name
email	String	Employee email
roleId	Integer	Foreign key to Role
departmentId	Integer	Foreign key to Department

Department Collection
Field	Type	Description
id	Integer	Primary key
name	String	Department name

Role Collection
Field	Type	Description
id	Integer	Primary key
title	String	Role title
salary	Float	Salary associated

Attendance Collection
Field	Type	Description
id	Integer	Primary key
employeeId	Integer	Foreign key to Employee
date	Date	Date of attendance
status	String	Present / Absent / Leave

Sequelize Example
Model Definitions:

javascript
Copy code
// models/Employee.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define("Employee", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = Employee;
Associations:

javascript
Copy code
const Department = require("./Department");
const Role = require("./Role");

Employee.belongsTo(Department, { foreignKey: "departmentId" });
Employee.belongsTo(Role, { foreignKey: "roleId" });
CRUD Example:

javascript
Copy code
const Employee = require("./models/Employee");

// Create
await Employee.create({ name: "John Doe", email: "john@example.com", departmentId: 1, roleId: 2 });

// Read
const employees = await Employee.findAll({ include: [Department, Role] });

// Update
await Employee.update({ name: "Jane Doe" }, { where: { id: 1 } });

// Delete
await Employee.destroy({ where: { id: 1 } });
TypeORM Example
Entity Definitions:

typescript
Copy code
// entities/Employee.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Department } from "./Department";
import { Role } from "./Role";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Department, (department) => department.employees)
  department: Department;

  @ManyToOne(() => Role, (role) => role.employees)
  role: Role;
}
Data Source Setup:

typescript
Copy code
// data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Employee } from "./entities/Employee";
import { Department } from "./entities/Department";
import { Role } from "./entities/Role";
import { Attendance } from "./entities/Attendance";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "employee.sqlite",
    synchronize: true,
    logging: false,
    entities: [Employee, Department, Role, Attendance],
});
CRUD Example:

typescript
Copy code
const employeeRepo = AppDataSource.getRepository(Employee);

// Create
const employee = employeeRepo.create({ name: "John Doe", email: "john@example.com" });
await employeeRepo.save(employee);

// Read
const employees = await employeeRepo.find({ relations: ["department", "role"] });

// Update
employee.name = "Jane Doe";
await employeeRepo.save(employee);

// Delete
await employeeRepo.remove(employee);
Running the Project
Initialize the database (Sequelize or TypeORM will create tables automatically if configured).

Start the Node.js server:

bash
Copy code
npm start
Access API routes (if implemented) using Postman or your browser.

Notes
Sequelize is better for simple SQL ORM usage.

TypeORM supports both SQL and NoSQL databases with advanced entity relationships.

Ensure proper associations between collections to maintain relational integrity.
