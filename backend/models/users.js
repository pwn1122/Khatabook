const mongoose = require('mongoose')

const schema = mongoose.Schema({
    username:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required :[ true , 'email is required'] ,
        unique: [true , 'This Email is already Registered']
    },
    password:{
        type: String,
        required :[true , 'Password is required'] 
    }
})

module.exports = mongoose.model('user' , schema );