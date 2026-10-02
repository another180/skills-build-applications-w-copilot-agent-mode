import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: String, required: true, unique: true, trim: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    streakDays: { type: Number, required: true, min: 0 },
    totalDistanceKm: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);
