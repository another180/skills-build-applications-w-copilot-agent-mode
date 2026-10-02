import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Seed the octofit_db database with test data');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      {
        username: 'mona',
        email: 'mona@example.com',
        name: 'Mona Patel',
        fitnessLevel: 'Advanced',
        weeklyGoalMinutes: 250,
        team: 'Velocity Crew',
      },
      {
        username: 'liam',
        email: 'liam@example.com',
        name: 'Liam Chen',
        fitnessLevel: 'Intermediate',
        weeklyGoalMinutes: 210,
        team: 'Velocity Crew',
      },
      {
        username: 'sophia',
        email: 'sophia@example.com',
        name: 'Sophia Nguyen',
        fitnessLevel: 'Beginner',
        weeklyGoalMinutes: 180,
        team: 'Summit Striders',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Velocity Crew',
        sport: 'Cycling',
        captain: 'mona',
        members: ['mona', 'liam'],
        weeklyGoal: 'Complete 300 km together',
      },
      {
        name: 'Summit Striders',
        sport: 'Running',
        captain: 'sophia',
        members: ['sophia'],
        weeklyGoal: 'Build a consistent 5K base',
      },
    ]);

    const activities = await Activity.insertMany([
      {
        user: 'mona',
        type: 'Ride',
        durationMinutes: 62,
        distanceKm: 32.5,
        caloriesBurned: 550,
        date: new Date('2026-09-28T06:00:00Z'),
        notes: 'Tempo ride focused on sustained power.',
      },
      {
        user: 'liam',
        type: 'Run',
        durationMinutes: 45,
        distanceKm: 8.2,
        caloriesBurned: 460,
        date: new Date('2026-09-29T18:30:00Z'),
        notes: 'Strong interval session with quick splits.',
      },
      {
        user: 'sophia',
        type: 'Walk',
        durationMinutes: 35,
        distanceKm: 4.1,
        caloriesBurned: 220,
        date: new Date('2026-09-30T07:15:00Z'),
        notes: 'Recovery walk with mobility focus.',
      },
    ]);

    const leaderboard = await Leaderboard.insertMany([
      { user: 'mona', score: 980, rank: 1, streakDays: 12, totalDistanceKm: 168 },
      { user: 'liam', score: 910, rank: 2, streakDays: 9, totalDistanceKm: 151 },
      { user: 'sophia', score: 760, rank: 3, streakDays: 6, totalDistanceKm: 108 },
    ]);

    const workouts = await Workout.insertMany([
      {
        title: 'Hill Sprint Intervals',
        category: 'Cardio',
        durationMinutes: 30,
        difficulty: 'Advanced',
        equipment: ['Cones', 'Stopwatch'],
        focusAreas: ['Power', 'Speed'],
      },
      {
        title: 'Core Stability Circuit',
        category: 'Strength',
        durationMinutes: 25,
        difficulty: 'Intermediate',
        equipment: ['Mat', 'Kettlebell'],
        focusAreas: ['Core', 'Balance'],
      },
      {
        title: 'Recovery Mobility Flow',
        category: 'Recovery',
        durationMinutes: 20,
        difficulty: 'Beginner',
        equipment: ['Yoga Mat'],
        focusAreas: ['Mobility', 'Flexibility'],
      },
    ]);

    console.log('Database seeding complete', {
      users: users.length,
      teams: teams.length,
      activities: activities.length,
      leaderboard: leaderboard.length,
      workouts: workouts.length,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
