const mongoose = require('mongoose');
const { z } = require('zod');

const Schema = mongoose.Schema;

// Define Zod schema for input validation
const studentZodSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  regNumber: z.number().positive().int(),
  age: z.number().positive().int().min(16).max(100),
  gender: z.enum(['Male', 'Female', 'Other']),
  address: z.string().optional(),
  contactNumber: z.number().optional(),
});

// Define Mongoose schema
const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  regNumber: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  contactNumber: {
    type: Number
  }
});

// Add a pre-save middleware to validate data using Zod
studentSchema.pre('save', async function(next) {
  try {
    await studentZodSchema.parseAsync(this.toObject());
    next();
  } catch (error) {
    next(error);
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
