import mongoose from 'mongoose';


// Define your schema
const userAnswer = new mongoose.Schema({

  mockIdRef: { type: String, required: true },
  question: { type: String, required: true },
  correctAns: { type: String },
  userAns: { type: String },
  feedback: { type: String },
  rating: { type: String },
  userEmail: { type: String },
  createdAt: { type: String },
});

export default mongoose.models.userAnswerSchema || mongoose.model('userAnswerSchema', userAnswer);
