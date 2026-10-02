import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    sport: { type: String, required: true, trim: true },
    captain: { type: String, required: true, trim: true },
    members: [{ type: String, trim: true }],
    weeklyGoal: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default model('Team', teamSchema);
