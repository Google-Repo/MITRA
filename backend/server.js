import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --------------------
// 1. Mongoose Models
// --------------------
const Student = mongoose.model("Student", new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rollNo: { type: String, required: true },
  course: { type: String, required: true }
}));

const Teacher = mongoose.model("Teacher", new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  employeeId: { type: String, required: true },
  department: { type: String, required: true },
  subject: { type: String, required: true }
}));

const Admin = mongoose.model("Admin", new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adminId: { type: String, required: true }
}));

// --------------------
// 2. Authentication Logic
// --------------------
const JWT_SECRET = process.env.JWT_SECRET;

// Reusable Signup Handler
const handleSignup = (Model, role) => async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    
    // Check if user already exists
    let user = await Model.findOne({ email });
    if (user) {
      return res.status(400).json({ error: `${role} already exists with this email.` });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create and save new user
    user = new Model({ email, password: hashedPassword, ...rest });
    await user.save();

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: "1d" });
    
    // Remove password from response for security
    const userResponse = { ...user._doc };
    delete userResponse.password;

    res.status(201).json({ token, [role]: userResponse });
  } catch (error) {
    console.error(`Error in ${role} signup:`, error);
    res.status(500).json({ error: "Server error during signup." });
  }
};

// Reusable Login Handler
const handleLogin = (Model, role) => async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: "1d" });
    
    // Remove password from response for security
    const userResponse = { ...user._doc };
    delete userResponse.password;

    res.json({ token, [role]: userResponse });
  } catch (error) {
    console.error(`Error in ${role} login:`, error);
    res.status(500).json({ error: "Server error during login." });
  }
};

// --------------------
// 3. API Routes
// --------------------
app.post("/api/students/signup", handleSignup(Student, "student"));
app.post("/api/students/login", handleLogin(Student, "student"));

app.post("/api/teachers/signup", handleSignup(Teacher, "teacher"));
app.post("/api/teachers/login", handleLogin(Teacher, "teacher"));

app.post("/api/admins/signup", handleSignup(Admin, "admin"));
app.post("/api/admins/login", handleLogin(Admin, "admin"));

// --------------------
// 4. Start Server
// --------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});