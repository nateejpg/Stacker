const mongoose = require('mongoose');

const habitSchema = mongoose.Schema({
    title: String,
    difficulty: String,
    counter: {type: Number, default: 0.0},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
})

const habitModel = mongoose.model("Habits", habitSchema);

module.exports = habitModel;