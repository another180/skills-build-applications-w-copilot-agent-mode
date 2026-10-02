import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: ['Run', 'Ride', 'Swim', 'Strength', 'Yoga', 'Walk'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

export default model('Activity', activitySchema);
