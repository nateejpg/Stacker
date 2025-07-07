const mongoose = require('mongoose')

const stackerSchema = mongoose.Schema({
    content: String,
    difficulty: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
})

const StackerModel = mongoose.model('Stacks', stackerSchema)

module.exports = StackerModel