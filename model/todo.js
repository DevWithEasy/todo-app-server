const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title:{
        type: 'string',
        required: true
    },
    details:{
        type: 'string',
        required: true
    },
    status:{
        type: 'string',
        enum: ['Active', 'Inactive']
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User',
    }
})

const todoModel = mongoose.model('Todo', todoSchema);
module.exports = todoModel;