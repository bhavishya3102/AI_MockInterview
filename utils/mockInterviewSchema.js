const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MockInterview Schema
const mockInterview = new Schema({
  jsonMockResp: { type: String, required: true },
  jobPosition: { type: String, required: true },
  jobDesc: { type: String, required: true },
  jobExperience: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  mockId: { type: String, required: true }
});

export default mongoose.models.mockInterviewSchema || mongoose.model('mockInterviewSchema', mockInterview);




