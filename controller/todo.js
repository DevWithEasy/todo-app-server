const Todo = require('../model/todo')
const User = require('../model/user')

exports.createTodo =async(req,res)=>{
    try{
        const todo = await Todo(req.body).save();
        await User.updateOne(
            {_id:req.body.user},
            {
                $push:{
                    todos: todo._id
                }
            }
        )
        res.json({status:'Success',msg:'Todo saved successfully'})
    }catch(err){
        res.json({staus:'Failed',error:'Internal Server Error'});
    }
}
exports.getAllTodo = async(req,res)=>{
    try{
        const data = await Todo.find({user:req.params.id})
        res.json({status:'success',data:data});
    }catch(err){
        res.json({error:'Internal Server Error'});
    }
}
exports.getSingleTodo =async(req,res)=>{
    try{
        const data = await Todo.findById(req.params.id);
        res.json({status:'success',data:data});
    }catch(err){
        res.json({error:'Internal Server Error'});
    }
}
exports.updateTodo = async (req,res)=>{
    try{
        await Todo.updateOne({_id:req.params.id},{
            $set:{
                title:req.body.title,
                details:req.body.details,
                status:req.body.status
            }
        })
        // const data = await Todo.findByIdAndUpdate({_id:req.params.id},{
        //     $set:{
        //         title:req.body.title,
        //         details:req.body.details,
        //         status:req.body.status
        //     }
        // },
        // {useFindAndModify:false}
        // )
        res.json({status:'Success',msg:'Todo updated successfully'});
    }catch(err){
        res.json({status:'Failed',msg:'Internal Server Error'});
    }
}
exports.deleteTodo =async (req,res)=>{
    try{
        const data = await Todo.findById({_id:req.params.id})
        await User.updateOne({_id:data.user},{
            $pull:{
                todos: req.params.id
            }
        })
        await Todo.deleteOne({_id:req.params.id})
        res.json({status:'Success',msg:'Todo delete successfully'});
        
    }catch(err){
        res.json({status:'Failed',msg:'Internal Server Error'});
    }
}