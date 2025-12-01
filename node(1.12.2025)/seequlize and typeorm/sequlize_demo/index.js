const { Sequelize, DataTypes } = require("sequelize");

// Connect to database (MySQL example)
const sequelize = new Sequelize("student", "root", "sree@Mani1210", {
  host: "localhost",
  dialect: "mysql",
});

// Define Model
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  }
});

// Run Sequelize
async function run() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection successful!");

    await sequelize.sync();  // create table automatically
    console.log("📌 Tables synced!");

    // Insert a user
    const user = await User.create({
      name: "Subasri",
      email: "subasri@example.com",
    });

    console.log("Inserted User:", user.toJSON());
    
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

run();
