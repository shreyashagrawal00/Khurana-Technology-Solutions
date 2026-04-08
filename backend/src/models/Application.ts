import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  jdLink: { type: String },
  notes: { type: String },
  dateApplied: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['Applied', 'Phone Screen', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  salaryRange: { type: String },
  parsedData: {
    skills: [String],
    niceToHave: [String],
    seniority: String,
    location: String
  },
  aiSuggestions: [String]
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
