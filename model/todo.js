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
        enum: ['Continue', 'Pending','Completed']
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User',
    }
})

const todoModel = mongoose.model('Todo', todoSchema);
module.exports = todoModel;