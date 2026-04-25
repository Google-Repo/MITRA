import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  subject: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
teacherSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      next();
      return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
teacherSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
