const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
    profileImage:{
        type: 'string',
        required: true
    },
    todos:[
        {
            type: mongoose.Types.ObjectId,
            ref:"Todo"
        }
    ]
})

const userModel = mongoose.model('User', userSchema)
module.exports = userModel