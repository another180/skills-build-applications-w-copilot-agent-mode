import express from 'express';
import connectDatabase from './config/database.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';

export const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

app.get('/api/users/', async (_request, response) => {
  const users = await User.find({}).lean();
  response.json(users);
});

app.get('/api/teams/', async (_request, response) => {
  const teams = await Team.find({}).lean();
  response.json(teams);
});

app.get('/api/activities/', async (_request, response) => {
  const activities = await Activity.find({}).sort({ date: -1 }).lean();
  response.json(activities);
});

app.get('/api/leaderboard/', async (_request, response) => {
  const leaderboard = await Leaderboard.find({}).sort({ rank: 1 }).lean();
  response.json(leaderboard);
});

app.get('/api/workouts/', async (_request, response) => {
  const workouts = await Workout.find({}).lean();
  response.json(workouts);
});

export async function startServer() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
    console.log(`Public base URL: ${baseUrl}`);
  });
}
