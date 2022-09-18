const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');


exports.registrationPost=async(req,res)=>{
    try{
        const hasedPassword = await bcrypt.hash(req.body.password,10)
        const newUser= new User({
            name: req.body.name,
            email: req.body.email,
            password: hasedPassword,
            profileImage: req.file.filename
        })
        await newUser.save();
        res.json({success:'registration succesfull'});
    }catch(err){
        res.json({error:'Internal Server Error'});
        console.log(err)
    }
    console.log(req.body,req.file)
}
exports.logInPost =async (req, res) => {
    try{
        const user = await User.findOne({email:req.body.email}).populate('todos')
        const match = await bcrypt.compare(req.body.password, user.password)
        if(match){
            res.json({msg:'user found successfully',user:{
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
                todos: user.todos
            }})
        }else{
            res.json({failed:'user can not be found',message:'Please enter a valid email address and password'})
        }
    }catch(err){
        res.json({error:'Internal Server Error'});
    }
}