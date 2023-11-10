const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
    workout: {
        type: String,
        required: true,
    },
    minutes: {
        type: String,
        required: true,
    },
    calories: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;


