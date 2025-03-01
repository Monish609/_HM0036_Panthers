import Mentor from '../models/Mentor.js';
import User from '../models/User.js';

// Match Student with Mentor
export const matchMentor = async (req, res) => {
  const { studentId } = req.body;

  try {
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const mentor = await Mentor.findOne({ availability: true });
    if (!mentor) {
      return res.status(404).json({ message: 'No available mentors' });
    }

    res.status(200).json({ message: 'Mentor matched successfully', mentor });
  } catch (error) {
    res.status(500).json({ message: 'Error matching mentor', error: error.message });
  }
};