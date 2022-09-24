const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Todo = require('../model/todo');
const fs = require('fs');
const path = require('path')


exports.registrationPost=async(req,res)=>{
    try{
        const hasedPassword = await bcrypt.hash(req.body.password,10)
        const newUser= new User({
            name: req.body.name,
            email: req.body.email,
            password: hasedPassword,
            profileImage: req.file.filename
        })
        newUser.save((err, user) => {
            if (err){
                res.json({status:"failed",msg:'registration failed'});
            }else{
                res.json({status:"success",msg:'registration succesfull',user:user});
            }
        });
    }catch(err){
        res.json({status:"failed",msg:'Internal Server Error'});
    }
    console.log(req.body,req.file)
}

exports.logInPost =async (req, res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        const match = await bcrypt.compare(req.body.password, user.password)
        if(match){
            res.json({status:'success',msg:'user found successfully',user:{
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            }})
        }else{
            res.json({status:'failed',message:'Please enter a valid email address and password'})
        }
    }catch(err){
        res.json({error:'Internal Server Error'});
    }
}

exports.getProfile =async (req, res) => {
    try{
        User.findOne({_id:req.params.id}).select({
            _v:0,
            password:0
        }).exec((err,data)=>{
            if(err){
                res.json({status:'failed',message:'credentail error'})
            }else{
                res.json({status:'success',data:data})
            }
        })
    }catch(err){
        res.json({status:'failed',message:'Internal server error'})
    }
}
exports.deleteProfile=async (req,res)=>{
   try{
    const user = await User.findOne({_id:req.params.id});
    await Todo.deleteMany({_id:{$in:user.todos}})

    User.deleteOne({_id:req.params.id}, (err)=>{
        if(err){
            res.json({status: 'error', message: 'Delete user failed'})
        }else{
            fs.unlinkSync('public/upload/'+user.profileImage)
            res.json({status: 'success', message: 'Delete user succeessfully'})
        }
    })
    
   }catch(err){
    res.json({status: 'error', message: err.message})
   }
}