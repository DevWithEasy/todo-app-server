const userRouter = require('./user');
const todoRouter = require('./todo')
const  routes = [
    {
        path:'/user',
        handler: userRouter
    },
    {
        path:'/todo',
        handler: todoRouter
    },
    {
        path:'/',
        handler: (req,res)=>{
            res.send('hello world');
        }
    }
]
const routers = (app)=>{
    routes.forEach(router =>{
        if(router.path === '/'){
            app.get(router.path, router.handler)
        }else{
            app.use(router.path,router.handler)
        }
    })
} 

module.exports = routers