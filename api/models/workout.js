const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
    workout: Number,
    minutes: Number,
    calories: Number,
    date: { type: Date, default: Date.now },
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;


