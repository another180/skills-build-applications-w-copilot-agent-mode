import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    fitnessLevel: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    weeklyGoalMinutes: { type: Number, required: true, min: 0 },
    team: { type: String, trim: true },
  },
  { timestamps: true },
);

export default model('User', userSchema);
