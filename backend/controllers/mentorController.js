import Mentor from '../models/Mentor.js';

// Create Mentor
export const createMentor = async (req, res) => {
  const { name, expertise, availability } = req.body;

  try {
    const mentor = await Mentor.create({ name, expertise, availability });
    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating mentor', error: error.message });
  }
};

// Get All Mentors
export const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mentors', error: error.message });
  }
};