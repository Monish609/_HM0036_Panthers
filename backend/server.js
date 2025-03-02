import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import errorHandler from './utils/errorHandler.js';
import progressRoutes from './routes/progressRoutes.js';
import rewardRoutes from './routes/rewardRoutes.js';
import matchmakingRoutes from './routes/matchmakingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import path from 'path';

import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const corsOptions = {
  origin: 'http://localhost/5173', // Replace with your frontend domain
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

// Middleware
app.use(cookieParser()); 
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err)); 

// Routes
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/matchmaking', matchmakingRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));