import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  availability: { type: Boolean, default: false },
});

export default mongoose.model('Mentor', mentorSchema);