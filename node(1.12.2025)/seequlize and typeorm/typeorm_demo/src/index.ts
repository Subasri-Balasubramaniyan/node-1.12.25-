import express from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

const app = express();
app.use(express.json());

// Connect Database
AppDataSource.initialize().then(() => {
  console.log("📌 Database Connected");

  // Create User
  app.post("/users", async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = userRepo.create(req.body);
    await userRepo.save(user);
    res.json(user);
  });

  // Get Users
  app.get("/users", async (req, res) => {
    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find();
    res.json(users);
  });

  app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
});
